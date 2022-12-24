import { AxiosError } from 'axios';
import { Button, Card, Rating, Table } from 'flowbite-react';
import React, { useMemo, useState } from 'react';
import api from '../services/api';
import { DonatePackage, Package, ResponsePackage } from './admin/Donate';
import chestImage from '../assets/images/chest.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import PicpayImage from '../assets/images/picpay.png';
import MercadoPagoImage from '../assets/images/mercadopago.png';
import PaymentsImage from '../assets/images/pagamentos.png';
import PixImage from '../assets/images/pix.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IErrorMessage, IErrorResponse, IResponseDonation } from '../@types/User';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

function Donate() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [meta, setMeta] = useState<any>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState('');
    const [loadingDonate, setLoadingDonate] = useState<boolean>();
    const [agree, setAgree] = useState<boolean>(false);
    const navigate = useNavigate();
    const [QRCode, setQRCode] = useState<string>('');
    const [metaDonate, setMetaDonate] = useState<any>();
    const [modal, setModal] = useState<boolean>(false);
    const [donates, setDonates] = useState<DonatePackage[]>([]);
    const user = useSelector((state: RootState) => state.user.user!);

    useMemo(() => {
        const getPackages = async () => {
            setLoading(true);
            try {
                const { data } = await api.get<ResponsePackage>(`/packages/all`);
                const { meta } = data.packages;
                console.log(data);
                setPackages(data.packages.data);
                setMeta(meta);
            } catch (error) {
                error as Error | AxiosError;
                console.log(error);
            }
            setLoading(false);
        }
        getPackages();
    }, []);

    useMemo(() => {
        const getDonation = async () => {
            try {
                const { data } = await api.get<IResponseDonation>(`/donates/paginate`);
                const { donates, statusCode } = data;
                if (statusCode === 200) {
                    setDonates(donates.data);
                    setMetaDonate(donates.meta);
                }
            } catch (error) {
                error as Error | AxiosError;
                console.log(error);
            }
            setLoading(false);
        }
        getDonation();
    }, [loadingDonate]);

    const handleDonate = async (id: number, method: string) => {
        try {
            const { data } = await api.post<IResponseDonation>('/donates/create', {
                packageId: id,
                method,
            });

            if (data.statusCode === 200) {
                const { message } = data;
                setLoading(false);
                setError('');
                setLoadingDonate(!loadingDonate);
                toast.dark(message, {
                    type: 'success',
                    position: 'bottom-right',
                    delay: 1,
                });
                return;
            }

            setError(data.errors!.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            setLoading(false);
        } catch (error: any | AxiosError<IErrorResponse>) {
            console.log(error);
            error as Error | AxiosError<IErrorResponse>;

            if (error.code === 'ERR_BAD_RESPONSE') {
                setError('Aguarda uns instantes, servidor está offline!');
            }

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            }

            setLoading(false);
        }
    };

    return (
        <>
            {modal && (
                <div className="fixed shadow w-full h-full flex flex-col gap-2 top-0 left-0 bg-black bg-opacity-50 z-50 justify-center items-center">
                    <div className="flex flex-col gap-4">
                        <Button color="failure" onClick={() => {
                            setModal(false);
                            setQRCode('');
                        }}>Fechar</Button>
                        <img className="rounded-xl" src={QRCode} alt="QRCode!" width={300} />
                    </div>
                </div>
            )}
            <div className="text-center text-white uppercase text-4xl font-bold my-8 py-3">
                Doação
            </div>
                <div className="grid grid-cols-3 gap-8 items-start pb-8">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="bg-[#2B2B28] border-2 border-[#E3B04B] p-8"
                        >
                            <div className="bg-[#39311D] py-4 text-center text-[#E3B04B] font-bold border-2 border-[#FFD369]">
                                {pkg.name}
                            </div>
                            <div className="text-center items-center flex flex-row justify-around">
                                <div className="p-2">
                                    <div className="pb-2 pt-1">
                                        Preço
                                    </div>
                                    <div className="text-green-400 rounded py-2">
                                        {pkg.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="pb-2 pt-1">
                                        Bônus
                                    </div>
                                    <div className="py-2">
                                        {pkg.bonus}%
                                    </div>
                                </div>
                                <div className="p-2 ">
                                    <div className="pb-2 pt-1">
                                        Donate
                                    </div>
                                    <div className="py-2">
                                        {parseInt(pkg.donate) + Math.ceil(parseInt(pkg.donate) * parseInt(pkg.bonus) / 100)}
                                    </div>
                                </div>
                            </div>
                            {!!pkg.items.length && (
                                <div className="text-center text-white py-2 px-2 border-[#E3B04B] border-t-2 flex flex-col">
                                    <div className="pb-2 pt-1">
                                        Itens de bonificação
                                    </div>
                                    <div className="flex justify-around">
                                        {pkg.items.map((_pkg, index) => (
                                            <div key={index} className="py-2 px-2">
                                                {_pkg.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col justify-center gap-4 p-6">
                                {user && localStorage.getItem('token') && (
                                    <>
                                        <Button
                                            onClick={() => {
                                                handleDonate(pkg.id, 'picpay');
                                            }}
                                            color="success"
                                            size="xl"
                                        >
                                            Picpay
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleDonate(pkg.id, 'mercado pago');
                                            }}
                                            color="info"
                                            size="xl"
                                        >
                                            Mercado Pago
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            <div className="mt-10 p-4 border border-[#FFD369] bg-[#2B2B28] shadow">
                <div className="flex mb-3 bg-[#39311D] text-[#E3B04B] py-3 border border-[#FFD369] justify-center">
                    Doações
                </div>
                <div className="flex justify-center">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="dark:bg-[#585858]">Pacote</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-[#585858]">Método</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-[#585858]">Data</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-[#585858]">Estado</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-[#585858]"></Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {donates.map((donate, index) => (
                                <Table.Row key={index} className="bg-[#383838] hover:bg-neutral-700">
                                    <Table.Cell>{donate.package.name}</Table.Cell>
                                    <Table.Cell>{donate.method}</Table.Cell>
                                    <Table.Cell>
                                        {donate.updated_at ? (
                                            formatDistance(new Date(donate.updated_at), new Date(), { locale: pt, addSuffix: true })
                                        ) : (
                                            formatDistance(new Date(donate.created_at), new Date(), { locale: pt, addSuffix: true })
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(donate.created_at).getTime() + 5 * 24 * 60 * 60 * 1000 < new Date().getTime() && (
                                            <span className="text-red-500">Expirado</span>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="flex gap-4">
                                        <Button onClick={() => {
                                            const url = donate.payment_url;
                                            window.open(url, '_blank');
                                        }} color="info">Pagar</Button>
                                        {donate.qrcode && (
                                            <Button color="info" onClick={() => {
                                                setQRCode(donate.qrcode);
                                                setModal(true);
                                            }}>
                                                QRCode
                                            </Button>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Donate;
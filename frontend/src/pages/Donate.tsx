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
            <div className="text-center uppercase text-4xl font-bold mt-4 mb-2 py-3">
                Doação
            </div>
            <div className="my-2 p-4 rounded bg-neutral-900 border border-neutral-700 text-justify">
                <div className="border border-neutral-700 rounded p-2 mb-2">
                    <p className="p-2 mb-3 text-center font-bold uppercase">Ajude a manter o WYD Imperial!</p>
                    <p className="text-justify">
                        O WYD Imperial é um servidor gratuito, que não possui nenhum tipo de patrocínio.
                        O servidor é mantido por doações de jogadores, que são utilizadas para pagar os custos do servidor, como hospedagem, domínio, manutenção, vps, etc.
                        <br />
                        <br />
                        Você pode ajudar o servidor a permanecer online, doando para o servidor. Ao doar, você receberá um pacote de doação com itens e/ou moedas para utilizar no jogo.
                        <br />
                        <br />
                        <div className="flex items-center gap-1">
                            <svg className="w-10 h-10 inline-block text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm.707-9.707a1 1 0 00-1.414 0L8 8.586V11a1 1 0 102 0V8.586l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="font-bold">OBS:</span> Ao doar, você concorda com os <a onClick={() => navigate('/rules')} className="text-blue-400 cursor-pointer">Termos de Uso</a> e <a onClick={() => navigate('/rules')} className="text-blue-400 cursor-pointer">Regras</a> do servidor.
                        </div>
                    </p>
                </div>
                <div className="flex gap-10 justify-center items-center py-4">
                    <div>
                        <img width="100px" src={PicpayImage} alt="" loading="lazy" />
                    </div>
                    <div>
                        <img width="150px" src={MercadoPagoImage} alt="" loading="lazy" />
                    </div>
                    <div>
                        <img width="330px" src={PaymentsImage} alt="" loading="lazy" />
                    </div>
                    <div>
                        <img width="130px" src={PixImage} alt="" loading="lazy" />
                    </div>
                </div>
                <div className="mt-2 flex w-40 mx-auto items-center justify-center">
                    <Button
                        color={agree ? 'failure' : 'success'}
                        onClick={() => setAgree(!agree)}
                    >
                        {agree ? 'Não concordo' : 'Concordar e doar'}
                    </Button>
                </div>
            </div>
            {agree && (
                <div className="grid grid-cols-3 gap-2 items-start">
                    {packages.map((pkg, index) => (
                        <Card
                            key={index}
                        >
                            <div className="flex justify-center">
                                <img width="50%" src={chestImage} alt="" loading="lazy" />
                            </div>
                            <div className="bg-neutral-700 border border-neutral-600 rounded py-4 text-center">
                                {pkg.name}
                            </div>
                            <div className="grid grid-row-1 gap-2 text-center items-center">
                                <div className="border border-neutral-700/50 grid grid-cols-2 items-center p-2 rounded">
                                    <div className="pb-2 pt-1">
                                        Preço
                                    </div>
                                    <div className="text-green-400 border border-neutral-700/50 rounded py-2">
                                        {pkg.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </div>
                                <div className="border border-neutral-700/50 grid grid-cols-2 items-center p-2 rounded">
                                    <div className="pb-2 pt-1">
                                        Bônus
                                    </div>
                                    <div className="border border-neutral-700/50 rounded py-2">
                                        {pkg.bonus}%
                                    </div>
                                </div>
                                <div className="border border-neutral-700/50 grid grid-cols-2 items-center p-2 rounded">
                                    <div className="pb-2 pt-1">
                                        Donate
                                    </div>
                                    <div className="border border-neutral-700/50 rounded py-2">
                                        {parseInt(pkg.donate) + Math.ceil(parseInt(pkg.donate) * parseInt(pkg.bonus) / 100)}
                                    </div>
                                </div>
                            </div>
                            {!!pkg.items.length && (
                                <div className="text-center py-2 px-2 rounded border-neutral-700/50 border">
                                    <div className="pb-2 pt-1">
                                        Itens de bonificação
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {pkg.items.map((_pkg, index) => (
                                            <div key={index} className="border border-neutral-700/50 py-2 px-2 rounded">
                                                {_pkg.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-row-reverse justify-center gap-4 items-center">
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
                        </Card>
                    ))}
                </div>
            )}
            <div className="mt-4 p-4 border border-neutral-700 bg-neutral-800 shadow">
                <div className="flex mb-3 bg-neutral-700 py-3 border border-neutral-600 rounded justify-center">
                    Doações
                </div>
                <div className="flex justify-center">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="dark:bg-neutral-700">Pacote</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-neutral-700">Método</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-neutral-700">Data</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-neutral-700">Estado</Table.HeadCell>
                            <Table.HeadCell className="dark:bg-neutral-700"></Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {donates.map((donate, index) => (
                                <Table.Row key={index} className="bg-neutral-700/75 hover:bg-neutral-700">
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
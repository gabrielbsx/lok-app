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
import { IErrorMessage, IErrorResponse, IResponseDonation } from '../@types/User';
import { toast } from 'react-toastify';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

function Donation() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [donates, setDonates] = useState<DonatePackage[]>([]);
  const [meta, setMeta] = useState<any>();
  const [modal, setModal] = useState<boolean>(false);
  const [QRCode, setQRCode] = useState<string>('');
  const [metaDonate, setMetaDonate] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState('');
  const [agree, setAgree] = useState<boolean>(false);
  const [loadingDonate, setLoadingDonate] = useState<boolean>(false);
  const navigate = useNavigate();
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
  }

  return (
    <div className='w-3/4 flex flex-col mx-auto'>
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
      <div className="text-center mt-4 bg-[#39311D] border-[#FFD369] text-[#FFD369] border mb-2 py-3">
        Pacotes de doação
      </div>
      <div className="my-2 p-2 sm:p-4 bg-[#2B2B28] border-[#FFD369] border text-justify">
        <div className=" bg-[#2B2B28] border-[#FFD369] p-2 mb-2">
          <p className="bg-[#39311D] text-[#E3B04B] p-2 mb-3 text-center font-bold">Ajude a manter o WYD Imperial!</p>
          <div className="py-1 px-3">
            <p className="mb-4 text-justify"><span className="text-red-300 uppercase">Atenção:</span> Ao doar você concorda com os termos de uso do site, e que o dinheiro será usado para manter o servidor online, e para a compra de novos itens para o servidor.</p>
            <p className="mb-4 text-center">Leia os termos e regras antes de concordar.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/rules')}>Regras do Jogo</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-2 my-4  border-[#FFD369]  flex-col">
          <p className="bg-neutral-700 text-center text-white font-bold p-2 uppercase">Métodos de pagamento</p>
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center bg-neutral-800 p-4 sm:p-2">
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
        </div>
        <div className="mt-2 flex justify-center">
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
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="mt-4 p-4 border border-[#FFD369] bg-[#2B2B28]">
        <div className="flex mb-3 bg-[#39311D] py-3 justify-center text-[#E3B04B]">
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
    </div>
  );
}

export default Donation;
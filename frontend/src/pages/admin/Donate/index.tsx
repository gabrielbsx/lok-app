import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Label, Modal, Pagination, Select, Spinner, Table, TextInput } from 'flowbite-react';
import { ErrorMessage } from '@hookform/error-message';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Meta } from '../../../@types/Meta';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import pt from 'date-fns/locale/pt';

export interface ItemEffect {
    effect?: number;
    value?: number;
};
  
export interface Item {
    id?: number;
    name?: string;
    effects: ItemEffect[];
};

export type Package = {
    id: number;
    name: string;
    slug: string;
    price: string | number;
    bonus: string;
    donate: string;
    items: Item[];
    created_at: string;
    updated_at?: string;
};

export type DonatePackage = {
    id: number;
    package_id: number;
    method: string;
    status: number;
    merchant_order: string;
    payment_id: string;
    qrcode: string;
    payment_url: string;
    authorization_id: string;
    reference_id: string;
    package: Package;
    created_at: string;
    updated_at?: string;
};

export type ResponseCreatePackage = {
    statusCode: number;
    message: string;
    package: Package;
};

export type ResponsePackage = {
    statusCode: number;
    message: string;
    packages: {
        meta: Meta;
        data: Package[];
    }
};

function Donate(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Package>();
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta>();
    const [packages, setPackages] = useState<Package[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [isCreatedPackage, setIsCreatedPackage] = useState<number>(0);
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [item, setItem] = useState<Item>({
        id: undefined,
        name: undefined,
        effects: [
            { effect: undefined, value: undefined },
            { effect: undefined, value: undefined },
            { effect: undefined, value: undefined },
        ],
    });

    const handlePageClick = (data: { selected: number }) => setPage(data.selected + 1);

    const onDelete = async (slug: string): Promise<void> => {
        try {
            const { data } = await api.delete(`/packages/delete/${slug}`);

            if (data.statusCode !== 200) {
                toast.dark(data.message, {
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    delay: 1,
                });
                
                return;
            }
            
            toast.dark(data.message, {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.BOTTOM_RIGHT,
                delay: 1,
            });

            setIsCreatedPackage(isCreatedPackage + 1);
        } catch (error) {
            error as Error | AxiosError;
        }
    };

    useMemo(() => {
        const getPackages = async () => {
            setTableLoading(true);
            try {
                const { data } = await api.get<ResponsePackage>(`/packages/all?page=${page}`);
                const { meta } = data.packages;
                setPackages(data.packages.data);
                setMeta(meta);
            } catch (error) {
                error as Error | AxiosError;
            }
            setTableLoading(false);
        }

        getPackages();
    }, [page, isCreatedPackage]);

    const onSubmit = async ({ name, price, bonus, donate }: Package): Promise<void> => {
        try {
            const { data } = await api.post<ResponseCreatePackage>('/packages/create', { name, price, bonus, donate, items });

            toast.dark(data.message, {
                type: 'success',
                position: 'bottom-right',
                delay: 1,
            });

            setIsCreatedPackage(data.package.id);
        } catch (error: any | AxiosError) {
            setError(error.response.data.errors.map((err: any) => err.message).join(', '));

            toast.dark('Erro ao criar o pacote!', {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
                delay: 1,
            });
        }
    };

    return (
        <div className="my-5 grid grid-cols-3 gap-4">
            <div className="col-span-3">
                <div>
                    <>
                        <Button color={isOpenAdd ? 'failure' : 'success'} onClick={() => setIsOpenAdd(!isOpenAdd)}>
                            {isOpenAdd ? 'Fechar' : 'Adicionar pacote'}
                        </Button>
                    </>
                    {isOpenAdd && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2">
                                <div className="text-center mb-4">
                                    Adicionar Notícia
                                </div>
                                <div>
                                    {!!error && (
                                        <div className="my-3 px-4 py-2 text-center rounded bg-red-500 border border-red-600 text-white">
                                            {error}
                                        </div>
                                    )}
                                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                        <div className="mb-4">
                                            <Label htmlFor="name" value="Nome do Pacote" />
                                            <TextInput
                                                type="text"
                                                id="name"
                                                required={true}
                                                {...register('name', {
                                                    required: true
                                                })}
                                                color={errors.name ? "failure" : "gray"}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="name"
                                                render={({ message }) => <small className="text-red-400">{message}</small>}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="price" value="Preço" />
                                            <TextInput
                                                type="text"
                                                id="price"
                                                required={true}
                                                {...register('price', {
                                                    required: true,
                                                    min: 0,
                                                })}
                                                color={errors.price ? "failure" : "gray"}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="price"
                                                render={({ message }) => <small className="text-red-400">{message}</small>}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="bonus" value="Bônus" />
                                            <TextInput
                                                type="number"
                                                id="bonus"
                                                required={true}
                                                {...register('bonus', {
                                                    required: true,
                                                    min: 0,
                                                })}
                                                color={errors.bonus ? "failure" : "gray"}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="bonus"
                                                render={({ message }) => <small className="text-red-400">{message}</small>}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="donate" value="Donate" />
                                            <TextInput
                                                type="number"
                                                id="donate"
                                                required={true}
                                                {...register('donate', {
                                                    required: true,
                                                    min: 0,
                                                })}
                                                color={errors.donate ? "failure" : "gray"}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="donate"
                                                render={({ message }) => <small className="text-red-400">{message}</small>}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="items" value="Itens" />
                                            <div className="grid grid-cols-4 gap-2 mb-4">
                                                {items.map((item, index) => (
                                                    <div key={index} className="flex gap-2 justify-end">
                                                        <div className="bg-neutral-700 py-2 px-6 rounded">
                                                            {item.name}
                                                        </div>
                                                        <Button
                                                            color="failure"
                                                            onClick={() => {
                                                                let itemWithoutDeletedItem = items;
                                                                itemWithoutDeletedItem.splice(index, 1);
                                                                setItems([ ...itemWithoutDeletedItem ]);
                                                            }}
                                                        >
                                                            Deletar
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-1 justify-center gap-4 mb-3">
                                                <div className="flex gap-1 justify-center">
                                                    <div className="gap-1 flex">
                                                        <TextInput
                                                            type="string"
                                                            value={item.name ?? ''}
                                                            placeholder="ITEM NAME"
                                                            onChange={(event) => {
                                                                const itemCpy = item;
                                                                itemCpy.name = event.target.value;
                                                                setItem({ ...itemCpy });
                                                            }}
                                                        />
                                                        <TextInput
                                                            type="number"
                                                            value={item.id ?? ''}
                                                            placeholder="ITEM ID"
                                                            onChange={(event) => {
                                                                const itemCpy = item;
                                                                itemCpy.id = parseInt(event.target.value);
                                                                setItem({ ...itemCpy });
                                                            }}
                                                        />
                                                    </div>
                                                    {[1, 2, 3].map((value, index) => (
                                                        <div key={index} className="gap-1 flex">
                                                            <TextInput
                                                                type="number"
                                                                value={item.effects[value - 1].effect ?? ''}
                                                                placeholder={`EFF${value}`}
                                                                onChange={(event) => {
                                                                    const itemCpy = item;
                                                                    itemCpy.effects[value - 1].effect = parseInt(event.target.value);
                                                                    setItem({ ...itemCpy });
                                                                }}
                                                            />
                                                            <TextInput
                                                                type="number"
                                                                value={item.effects[value - 1].value ?? ''}
                                                                placeholder={`EFFV${value}`}
                                                                onChange={(event) => {
                                                                    const itemCpy = item;
                                                                    itemCpy.effects[value - 1].value = parseInt(event.target.value);
                                                                    setItem({ ...itemCpy });
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                    <Button
                                                        onClick={() => {
                                                            setItems([...items, item]);
                                                            setItem({
                                                                id: undefined,
                                                                name: '',
                                                                effects: [
                                                                    { effect: undefined, value: undefined },
                                                                    { effect: undefined, value: undefined },
                                                                    { effect: undefined, value: undefined },
                                                                ],
                                                            });
                                                        }}
                                                    >
                                                        Adicionar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 mx-auto">
                                            <Button type="submit">
                                                Criar
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2">
                        <div className="text-center mb-4">
                            Listagem
                        </div>
                        <div style={{ maxWidth: '100%' }}>
                            {tableLoading ? (
                                <div className="text-center">
                                    <Spinner color="gray" size="xl" />
                                </div>
                            ) : (
                                <>
                                    <Table>
                                        <Table.Head>
                                            <Table.HeadCell className="dark:bg-neutral-700">Título</Table.HeadCell>
                                            <Table.HeadCell className="dark:bg-neutral-700">Data</Table.HeadCell>
                                            <Table.HeadCell className="dark:bg-neutral-700">Ações</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {packages.map((item, index) => {
                                                return (
                                                    <Table.Row key={index} className="bg-neutral-700/50 border-y border-neutral-600">
                                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            {item.name}
                                                        </Table.Cell>
                                                        <Table.Cell width={280}>
                                                            {item.updated_at ? formatDistance(new Date(item.updated_at), new Date(), { locale: pt }) : formatDistance(new Date(item.created_at), new Date(), { locale: pt })}
                                                        </Table.Cell>
                                                        <Table.Cell width={100}>
                                                            <div className="flex justify-center">
                                                                <div className="mx-1">
                                                                    <Button size="xs" onClick={() => {
                                                                        navigate(`/admin/donate/edit/${item.slug}`);
                                                                    }}>
                                                                        Editar
                                                                    </Button>
                                                                </div>
                                                                <div className="mx-1">
                                                                    <Button color="failure" size="xs" onClick={() => onDelete(item.slug)}>
                                                                        Excluir
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table>
                                    <>
                                        {meta && (
                                            <div className="flex justify-center">
                                                <ReactPaginate
                                                    previousLabel={'Anterior'}
                                                    nextLabel={'Próximo'}
                                                    breakLabel={'...'}
                                                    pageCount={meta.last_page}
                                                    onPageChange={handlePageClick}
                                                    activeClassName={'active'}
                                                    containerClassName={'xs:mt-0 mt-2 inline-flex items-center -space-x-px'}
                                                    previousClassName={'ml-0 rounded-l-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'}
                                                    nextClassName={'rounded-r-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'}
                                                    pageClassName={'w-12 border border-neutral-300 text-center bg-white py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'}
                                                    breakClassName={'w-12 border border-neutral-300 text-center bg-white py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white'}
                                                    activeLinkClassName={'bg-neutral-600 block w-full rounded-lg'}
                                                    forcePage={meta.current_page - 1}
                                                />
                                            </div>
                                        )}
                                    </>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donate;
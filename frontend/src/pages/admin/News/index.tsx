import{ MouseEvent, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button, Label, Modal, Pagination, Select, Spinner, Table, TextInput } from 'flowbite-react';
import { ErrorMessage } from '@hookform/error-message';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Meta } from '../../../@types/Meta.d';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import 'react-quill/dist/quill.snow.css';

type Category = 'Notícia' | 'Novidade' | 'Notas de Atualização' | 'Manutenção Emergencial' | 'Manutenção Semanal' | 'Evento' | 'Outros';

export type News = {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    category: Category;
    thumbnail: File | string;
    thumbnailUrl?: string;
    created_at: string;
    updated_at?: string;
};

type ResponseCreateNews = {
    statusCode: number;
    message: string;
    news: News;
};

export type ResponseNews = {
    statusCode: number;
    message: string;
    news: {
        meta: Meta;
        data: News[];
    }
};

export const categories = ['Notícia', 'Novidade', 'Notas de Atualização', 'Manutenção Emergencial', 'Manutenção Semanal', 'Evento'];
    
function News(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<News>();
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
    const [news, setNews] = useState<News[]>([]);
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta>();
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [isCreatedNews, setIsCreatedNews] = useState<number>(0);
    const navigate = useNavigate();

    const editorContent = watch('content', ' ');

    useMemo(() => {
        register('content', { required: true });
        setValue('content', ' ');
    }, [register]);

    useMemo(() => {
        const getNews = async () => {
            setTableLoading(true);
            try {
                const { data } = await api.get<ResponseNews>(`/news/all?page=${page}`);
                const { meta } = data.news;
                setNews(data.news.data);
                setMeta(meta);
            } catch (error) {
                error as Error | AxiosError;
            }
            setTableLoading(false);
        }

        getNews();
    }, [page, isCreatedNews]);

    const onEditorStateChange = (editorState: string) => setValue('content', editorState);

    const onSubmit = async ({ title, description, content, category, thumbnail, thumbnailUrl }: News): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('thumbnailUrl', thumbnailUrl!);
            if (thumbnail instanceof FileList) {
                formData.append('thumbnail', thumbnail[0]);
            }
            if (thumbnail instanceof File) {
                formData.append('thumbnail', thumbnail);
            }
            const { data } = await api.post<ResponseCreateNews>('/news/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            toast.dark(data.message, {
                type: 'success',
                position: 'bottom-right',
                delay: 1,
            });
            setIsCreatedNews(data.news.id);
        } catch (error) {
            error as Error | AxiosError;
            toast.dark('Erro ao criar notícia!', {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
                delay: 1,
            });
        }
    };

    const onDelete = async (slug: string): Promise<void> => {
        try {
            const { data } = await api.delete(`/news/delete/${slug}`);

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
            setIsCreatedNews(isCreatedNews + 1);
        } catch (error) {
            error as Error | AxiosError;
        }
    };

    const handlePageClick = (data: { selected: number }) => setPage(data.selected + 1);

    return (
        <>
            <div className="my-5 grid grid-cols-3 gap-4">
                <div className="col-span-3">
                    <div>
                        <>
                            <Button color={isOpenAdd ? 'failure' : 'success'} onClick={() => setIsOpenAdd(!isOpenAdd)}>
                                {isOpenAdd ? 'Fechar' : 'Adicionar notícia'}
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
                                        <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" encType="multipart/form-data">
                                            <div className="mb-4">
                                                <Label htmlFor="title" value="Título" />
                                                <TextInput
                                                    type="text"
                                                    id="title"
                                                    required={true}
                                                    {...register('title', {
                                                        required: true
                                                    })}
                                                    color={errors.title ? "failure" : "gray"}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="title"
                                                    render={({ message }) => <small className="text-red-400">{message}</small>}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Label htmlFor="description" value="Descrição" />
                                                <TextInput
                                                    type="text"
                                                    id="description"
                                                    required={true}
                                                    {...register('description', {
                                                        required: true
                                                    })}
                                                    color={errors.description ? "failure" : "gray"}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="description"
                                                    render={({ message }) => <small className="text-red-400">{message}</small>}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Label htmlFor="category" value="Categoria" />
                                                <Select
                                                    id="category"
                                                    required={true}
                                                    {...register('category', {
                                                        required: true,
                                                        validate: value => categories.includes(value)
                                                    })}
                                                >
                                                    <option>Selecione uma categoria</option>
                                                    {categories.map((category, index) => (
                                                        <option key={index} value={category}>{category}</option>
                                                    ))}
                                                </Select>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="category"
                                                    render={({ message }) => <small className="text-red-400">{message}</small>}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex flex-row justify-between">
                                                    <div className="w-full">
                                                        <Label htmlFor="thumbnail" value="Thumbnail" />
                                                    </div>
                                                    <div className="mx-10"></div>
                                                    <div className="w-full">
                                                        <Label htmlFor="thumbnail" value="Thumbnail" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-row justify-between gap-2">
                                                        <div className="flex w-full">
                                                            <input
                                                                type="file"
                                                                id="thumbnail"
                                                                required={false}
                                                                {...register('thumbnail', {
                                                                    required: false
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="items-center font-bold uppercase flex mx-4">
                                                            Ou
                                                        </div>
                                                        <div className="w-full gap-4 items-center">
                                                            <TextInput
                                                                type="text"
                                                                id="thumbnailUrl"
                                                                required={false}
                                                                {...register('thumbnailUrl', {
                                                                    required: false
                                                                })}
                                                                placeholder="Thumbnail URL"
                                                                color={errors.thumbnailUrl ? "failure" : "gray"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="thumbnailUrl"
                                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                                    />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="thumbnail"
                                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <ReactQuill
                                                    value={editorContent}
                                                    onChange={onEditorStateChange}
                                                    theme="snow"
                                                    className="bg-slate-100 rounded-lg p-2 text-neutral-800"
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="content"
                                                    render={({ message }) => <small className="text-red-400">{message}</small>}
                                                />
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
                                                {news.map((item, index) => {
                                                    return (
                                                        <Table.Row key={index} className="bg-neutral-700/50 border-y border-neutral-600">
                                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                {item.title}
                                                            </Table.Cell>
                                                            <Table.Cell width={280}>
                                                                {item.updated_at ? formatDistance(new Date(item.updated_at), new Date(), { locale: pt }) : formatDistance(new Date(item.created_at), new Date(), { locale: pt })}
                                                            </Table.Cell>
                                                            <Table.Cell width={100}>
                                                                <div className="flex justify-center">
                                                                    <div className="mx-1">
                                                                        <Button size="xs" onClick={() => {
                                                                            navigate(`/admin/news/edit/${item.slug}`);
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
        </>
    );
}

export default News;

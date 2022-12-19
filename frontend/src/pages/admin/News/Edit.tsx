import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { categories, News } from '../News';

type ResponseUpdateNews = {
    statusCode: number;
    message: string;
    news: News;
};

function Edit(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<News>();
    const editorContent = watch('content', ' ');
    const { slug } = useParams();
    const navigate = useNavigate();

    useMemo(() => {
        register('content', { required: true });
        setValue('content', ' ');
    }, [register]);

    useMemo(() => {
        const getNewsById = async () => {
            const { data } = await api.get<{ news: News }>(`/news/getBySlug/${slug}`);

            if (!data.news) {
                toast.dark('Notícia não encontrada', {
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            setValue('title', data.news.title);
            setValue('description', data.news.description);
            setValue('content', data.news.content);
            setValue('category', data.news.category);
            setValue('thumbnailUrl', data.news.thumbnail as string || '');
            setLoading(false);
        };

        getNewsById();
    }, []);

    const onEditorStateChange = (editorState: string) => setValue('content', editorState);

    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/admin/news');
    };

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
            const { data } = await api.put<ResponseUpdateNews>(`/news/update/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.statusCode === 200) {
                toast.dark(data.message, {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            toast.dark(data.message, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
                delay: 1,
            });
        } catch (error) {
            error as Error | AxiosError;

            toast.dark('Erro ao atualizar notícia!', {
                type: 'error',
                position: 'bottom-right',
                delay: 1,
            });
        }
    };

    if (loading) {
        return (
            <>
                <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2 text-center">
                    <Spinner size="xl" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2">
                <div>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
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
                                            value={watch('thumbnailUrl')}
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
                        <div className="mb-4 mx-auto flex">
                            <div className="mx-2">
                                <Button type="submit">
                                    Alterar
                                </Button>
                            </div>
                            <div className="mx-2">
                                <Button color="warning" onClick={goBack} type="submit">
                                    Voltar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;
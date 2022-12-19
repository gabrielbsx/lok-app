import { AxiosError } from 'axios';
import { Button, Spinner, Table } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { News as INews, ResponseNews } from './admin/News';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../services/api';
import ReactPaginate from 'react-paginate';
import { Meta } from '../@types/Meta';
import { useNavigate } from 'react-router-dom';

function News() {
    const [news, setNews] = useState<INews[]>();
    const [meta, setMeta] = useState<Meta>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useMemo(() => {
        const getNews = async () => {
            setLoading(true);   
            try {
                const { data } = await api.get<ResponseNews>(`/news/all?limit=10&page=${page}`);
                setNews(data.news.data);
                setMeta(data.news.meta);
            } catch (error) {
                error as Error | AxiosError;
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, [page]);

    const handlePageClick = (data: { selected: number }) => setPage(data.selected + 1);
    const goToNews = (slug: string) => navigate(`/news/${slug}`);

    return (
        <>
            <div className="text-center font-bold uppercase text-4xl mt-10">
                Notícias
            </div>
            {news ? (
                <div className="mt-5">
                    {!loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {news.map((news: INews) => (
                                <div key={news.id} className="flex flex-col rounded-lg bg-neutral-900 overflow-hidden border-8 border-neutral-900 shadow-2xl shadow-neutral-900">
                                    <a href="#" onClick={() => goToNews(news.slug)}>
                                        <img
                                            className="h-100 w-full object-cover hover:opacity-75"
                                            src={`${news.thumbnail as string}`} alt={news.title}
                                        />
                                    </a>
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{news.title}</h5>
                                        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{news.description}</p>
                                        <a
                                            className="text-neutral-900 dark:text-white font-bold hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg px-4 py-2 inline-flex items-center"
                                            href="#"
                                            onClick={() => goToNews(news.slug)}
                                        >
                                            Ler mais
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-2">
                            <Spinner size="xl" />
                        </div>
                    )}
                    <div className="my-3 text-center">
                        {meta && (
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
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center my-2">
                    <Spinner size="xl" />
                </div>
            )}
        </>
    );
}

export default News;
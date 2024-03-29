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
            <div className="text-center text-white font-bold uppercase text-4xl mt-10 pb-6">
                Notícias
            </div>
            {news ? (
                <div className="mt-5 px-8">
                    {!loading ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:w-full">
                            {news.map((news: INews) => (
                                <div key={news.id} className="flex flex-col rounded-sm bg-[#2B2B28] overflow-hidden border-1.5 border-neutral-900">
                                    <a href="#" onClick={() => goToNews(news.slug)}>
                                        <img
                                            className="h-100 w-full object-cover hover:opacity-50"
                                            src={`${news.thumbnail as string}`} alt={news.title}
                                        />
                                    </a>
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#E3B04B] ">{news.title}</h5>
                                        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{news.description}</p>
                                        <a
                                            className="text-[#E3B04B] font-bold bg-[#39311D] border-4 border-[#FFD369] transition-colors duration-200  hover:bg-[#292929]/50 px-4 py-2 inline-flex items-center"
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
                                previousClassName={'ml-0 rounded-l-lg bg-[#2B2B28] py-2 px-3 leading-tight text-white hover:bg-[#39311D]  hover:text-[#FFD369]'}
                                nextClassName={'rounded-r-lg bg-[#2B2B28] py-2 px-3 leading-tight text-white hover:bg-[#39311D] hover:text-[#FFD369]'}
                                pageClassName={'w-12 text-center bg-[#2B2B28] py-2 leading-tight text-white hover:text-[#FFD369]'}
                                breakClassName={'w-12 text-center bg-[#2B2B28] py-2 leading-tight text-white hover:bg-[#39311D]  hover:text-[#FFD369]'}
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
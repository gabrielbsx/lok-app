import { AxiosError } from 'axios';
import { Spinner, Table } from 'flowbite-react';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { Meta } from '../@types/Meta';
import { News } from '../@types/News.d';
import { ResponseNews } from '../pages/admin/News';
import api from '../services/api';

function NewsHome() {
    const [news, setNews] = useState<News[]>();
    const [meta, setMeta] = useState<Meta>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useMemo(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const { data } = await api.get<ResponseNews>(`/news/all?limit=3&page=${page}`);
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

    const goToNews = (slug: string) => navigate(`/news/${slug}`);

    const handlePageClick = (data: { selected: number }) => setPage(data.selected + 1);

    return (
        <div className="text-neutral-200 flex flex-col mx-10 rounded-lg pb-16">
            <div className="text-center text-white font-bold uppercase text-4xl pb-6">
                Notícias
            </div>
            <div className="mt-4">
                {news ? (
                    <>
                        {!loading ? (
                            <div className=" grid grid-cols-3 gap-6 px-8">
                                {news.map((news: News) => (
                                    <div key={news.id} className="flex flex-col rounded-sm bg-[#2B2B28] overflow-hidden ">
                                        <a href="#" onClick={() => goToNews(news.slug)}>
                                            <img
                                                className="h-100 w-full object-cover hover:opacity-50"
                                                src={`${news.thumbnail as string}`} alt={news.title}
                                            />
                                        </a>
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#E3B04B]">{news.title}</h5>
                                            <p className="text-neutral-700 dark:text-neutral-300 mb-4">{news.description}</p>
                                            <a
                                                className="text-[#E3B04B] font-bold transition-colors duration-200 bg-[#39311D] border-4 border-[#FFD369]  hover:bg-[#292929]/50 px-4 py-2 inline-flex items-center"
                                                href="#"
                                                onClick={() => goToNews(news.slug)}
                                            >
                                                Ler mais
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ): (
                            <div className="text-center mt-4">
                                <Spinner size="xl" />
                            </div>
                        )}
                        <div className="flex justify-center overflow-hidden mt-4">
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
                    </>
                ) : (
                    <div className="text-center mt-4">
                        <Spinner size="xl" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsHome;
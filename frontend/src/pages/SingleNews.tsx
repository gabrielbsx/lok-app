import { AxiosError } from 'axios';
import { Spinner } from 'flowbite-react';
import{ useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { News, ResponseOneNews } from '../@types/News';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../services/api';

function SingleNews(): JSX.Element {
    const [news, setNews] = useState<News>();
    const { slug } = useParams();

    useMemo(() => {
        const getNewsBySlug = async () => {
            try {
                const { data } = await api.get<ResponseOneNews>(`/news/getBySlug/${slug}`);

                setNews(data.news);
            } catch (error) {
                error as Error | AxiosError;
            }
        };

        getNewsBySlug();
    }, []);

    return (
        <>
            {news ? (
                <div className="p-3">
                    <div className="text-center font-bold py-4">
                        <span className="text-4xl">{news.title}</span>
                        <div className="text-md uppercase">
                            {news.category}
                        </div>
                    </div>
                    <div className="bg-neutral-900 shadow-neutral-900 shadow-xl rounded-xl p-4">
                        <div className="text-justify my-8 mx-4" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                        <div className="text-center border-t-2 border-neutral-800 pt-3">
                            {news.updated_at ? (
                                formatDistance(new Date(news.updated_at), new Date(), { locale: pt, addSuffix: true })
                            ) : (
                                formatDistance(new Date(news.created_at), new Date(), { locale: pt, addSuffix: true })
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <Spinner size="xl" />
                </div>
            )}
        </>
    );
}

export default SingleNews;
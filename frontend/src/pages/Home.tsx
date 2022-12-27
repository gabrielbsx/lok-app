import { useMemo, useState } from 'react';
import Slider from '../components/Slider';
import RankingHome from '../components/RankingHome';
import NewsHome from '../components/NewsHome';
import api from '../services/api';
import { AxiosError } from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import { News } from '../@types/News';
import RankingClosedBeta from '../components/RankingClosedBeta';
import RankingOpenedBeta from '../components/RankingOpenedBeta';
import Inventory from '../components/Inventory';
import Equipment from '../components/Equipment';
import Character from '../components/Character';
import { useReward } from 'react-rewards';
import { Button } from 'flowbite-react';
import bgImg from '../assets/images/pst.jpg';

function Home() {
    const [news, setNews] = useState<News[]>();
    const [newsError, setNewsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { reward, isAnimating } = useReward('rewardId', 'confetti');

    useMemo(() => {
        (async () => {
            setNews([]);
            try {
                const { data } = await api.get('/news/all');
                const { meta } = data.news;
                setNewsError(false);
            } catch (error: any) {
                error as Error | AxiosError;
                if (error.isAxiosError) {
                    setNewsError(true);
                    setErrorMessage(error.response.statusText);
                }
            }
        })();
    }, []);

    return (
        <div className='overflow-hidden'>
            {/* <div className="
            w-full h-96 bg-green-500 bg-cover 
            bg-center bg-[url('https://images5.alphacoders.com/861/861521.jpg')]
            mb-8 opacity-50">
            </div> */}
            <div className="
            bg-scroll  
            w-screen h-96 bg-cover 
            bg-center bg-[url('https://i.postimg.cc/kgVWJprd/aa.png')]
            mb-8 opacity-50">
            </div>
            {newsError && <ErrorMessage message={errorMessage} where={'Notícias'} />}
            <div className="">
                <div className="col-span-2">
                    <NewsHome />
                </div>
                <div className="col-span-2 mx-16 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 gap-5 pt-16">
                    <div className="col-span-3 lg:col-span-4 xl:col-span-3 ">
                        <RankingHome />
                    </div>
                    <iframe
                        className="w-full col-span-3 lg:col-span-4 xl:col-span-1 pt-28"
                        src="https://ptb.discord.com/widget?id=975216695222358046&theme=dark"
                        height="500"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                    {/* <iframe
                        className="rounded-xl xl:col-span-1 lg:col-span-2 border-2 border-neutral-400 w-full"
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fimperialwd&tabs=timeline&width=330&height=500&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
                        height="500"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe> */}
                </div>
            </div>
        </div>
    );
}

export default Home;
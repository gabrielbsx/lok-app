import { Button, Spinner, Table } from 'flowbite-react';
import { useMemo, useState } from 'react';
import api from '../services/api';
import KingdomRedImage from '../assets/images/red.png';
import KingdomBlueImage from '../assets/images/blue.png';
import KingdomWhiteImage from '../assets/images/white.png';
import TransKnightImage from '../assets/images/tkflag.png';
import FoemaImage from '../assets/images/fmflag.png';
import BeastMasterImage from '../assets/images/bmflag.png';
import HuntressImage from '../assets/images/htflag.png';
import ReactPaginate from 'react-paginate';
import { Meta } from '../@types/Meta';
import Character from './Character';

function RankingHome() {
    const [loading, setLoading] = useState<boolean>(false);
    const [ranking, setRanking] = useState<any[]>([]);
    const [characterSelected, setCharacterSelected] = useState<any>();
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta>();
    const [order, setOrder] = useState<string>('evolution_order');
    const [refresh, setRefresh] = useState<boolean>(false);

    useMemo(() => {
        const getRanking = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/characters/ranking-live?page=${page}&order=${order}`);
                setRanking(data.characters.data);
                setMeta(data.characters.meta);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getRanking();
    }, [page, order, refresh]);

    const handlePageClick = (data: { selected: number }) => setPage(data.selected + 1);

    const getKingdom = (kingdom: string) => {
        switch (kingdom) {
            case 'Akelonia':
                return 'bg-red-900';
            case 'Hekalotia':
                return 'bg-blue-900';
            case 'Adventure':
                return 'bg-neutral-500';
            default:
                return 'bg-neutral-700';
        }
    }

    const getGuildMedal = (guildLevel: number) => {
        switch (guildLevel) {
            case 9:
                return 'border-2 border-yellow-400';
            case 6:
                return 'border-2 border-gray-400';
            default:
                return 'border-neutral-800';
        }
    }

    const getClassImage = (classType: string) => {
        switch (classType) {
            case 'TransKnight':
                return TransKnightImage;
            case 'Foema':
                return FoemaImage;
            case 'BeastMaster':
                return BeastMasterImage;
            case 'Huntress':
                return HuntressImage;
            default:
                return TransKnightImage;
        }
    }

    return (
        <div>
            <div className="flex justify-center gap-4 font-bold text-2xl items-center uppercase border-neutral-700 p-4 text-center">
                <div>Ranking</div>
            </div>
            <div className="p-4 bg-yellow-500 rounded-lg mb-4">
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <label>Ranqueamento por: </label>
                        <select
                            className="bg-white-300 text-yellow-500 px-4 py-1 outline-none rounded-md focus:outline-none"
                            onChange={(e) => setOrder(e.target.value)}
                        >
                            <option value="evolution_order" selected>Level</option>
                            <option value="elo">Elo</option>
                            {/* <option value="kills">Kills</option> */}
                            {/* <option value="deaths">Deaths</option> */}
                        </select>
                    </div>
                    <button
                        className="bg-blue-700 text-neutral-100 px-4 py-2 outline-none rounded-md focus:outline-none"
                        onClick={() => setRefresh(!refresh)}
                    >
                        Atualizar ranking
                    </button>
                </div>
            </div>
            {!loading ? (
                <Table className="border-8 border-stone-800 shadow-neutral-900 shadow-2xl">
                    <Table.Head>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">#</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Nick</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Level</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Classe</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Evolução</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Elo</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Kills</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Deaths</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-yellow-500 text-red-100">Reino</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {ranking.map((character, index) => (
                            <Table.Row
                                // className={`${getKingdom(character.kingdom)} border-neutral-800 hover:text-white hover:opacity-60`}
                                className={`bg-neutral-900 border-neutral-800 hover:text-white hover:opacity-60`}
                                key={index}
                            >
                                <Table.Cell>
                                    <div
                                        className={
                                            `${
                                                (index + 1) + ((page - 1) * 6) === 1 ? 'border-2 border-yellow-500 bg-yellow-700 rounded-lg font-bold text-white flex justify-center items-center' :
                                                (index + 1) + ((page - 1) * 6) === 2 ? 'border-2 border-yellow-500 bg-yellow-700 rounded-lg font-bold text-white flex justify-center items-center' :
                                                (index + 1) + ((page - 1) * 6) === 3 ? 'border-2 border-yellow-500 bg-yellow-700 rounded-lg font-bold text-white flex justify-center items-center' :
                                                'flex justify-center items-center'
                                            } w-5 block`
                                        }
                                    >
                                        {(index + 1) + ((page - 1) * 6)}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="flex items-center">
                                    {character.guild_id && (
                                        <img
                                            src={`https://api.wydimperial.com/guilds/b0${1000000 + character.guild_id}.bmp`}
                                            className={`rounded w-5 h-5 mr-1 ${getGuildMedal(character.guild_level)}`}
                                            onError={(e) => {
                                                // e.currentTarget.style.display = 'none'
                                            }}
                                            alt=""
                                        />
                                    )}
                                    <span
                                        className={
                                            ((index + 1) + ((page - 1) * 6)) === 1 ? 'text-yellow-300 font-bold text-lg' :
                                            ((index + 1) + ((page - 1) * 6)) === 2 ? 'text-yellow-300 font-bold text-lg' :
                                            ((index + 1) + ((page - 1) * 6)) === 3 ? 'text-yellow-300 font-bold text-lg' :
                                            'text-white'
                                        }
                                    >
                                        {character.nick}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    {character.evolution === 'SubCelestial' ? (
                                        <div className="flex items-center gap-1">
                                            <span>{character.level}</span>
                                            <span>{character.sub_level}</span>
                                        </div>
                                    ) : (
                                        <>
                                            {character.level}
                                        </>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {character.evolution === 'SubCelestial' ? (
                                        <div className="flex gap-2">
                                            <img src={getClassImage(character.class)} alt={character.class} className="w-5 rounded" />
                                            <img src={getClassImage(character.sub_class)} alt={character.sub_class} className="w-5 roudned" />
                                        </div>
                                    ) : (
                                        <img src={getClassImage(character.class)} alt={character.class} className="w-5 rounded" />
                                    )}
                                </Table.Cell>
                                <Table.Cell>{character.evolution}</Table.Cell>
                                <Table.Cell>{character.elo}</Table.Cell>
                                <Table.Cell>{character.kills}</Table.Cell>
                                <Table.Cell>{character.deaths}</Table.Cell>
                                <Table.Cell>
                                    {character.kingdom === 'Akelonia' && (
                                        <img src={KingdomRedImage} alt="Kingdom Red" className="w-5 rounded-lg" />
                                    )}
                                    {character.kingdom === 'Hekalotia' && (
                                        <img src={KingdomBlueImage} alt="Kingdom Blue" className="w-5 rounded-lg" />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <div className="text-center mx-auto mt-4">
                    <Spinner size="xl" />
                </div>
            )}
            < div className="flex justify-center overflow-hidden">
                {meta && !characterSelected && (
                    <ReactPaginate
                        previousLabel={'Voltar'}
                        nextLabel={'Avançar'}
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
        </div >
    );
}

export default RankingHome;

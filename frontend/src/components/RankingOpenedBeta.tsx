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

function RankingOpenedBeta() {
  const [loading, setLoading] = useState<boolean>(false);
  const [ranking, setRanking] = useState<any[]>([]);
  const [characterSelected, setCharacterSelected] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>();

  useMemo(() => {
    const getRanking = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/characters/ranking-beta-opened?page=${page}`);
        setRanking(data.characters.data);
        setMeta(data.characters.meta);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getRanking();
  }, [page]);

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
    <div className="bg-neutral-800/70 p-3 border-4 border-neutral-700 rounded-xl">
      <div className="flex justify-center gap-2 font-bold items-center bg-neutral-800 mb-1 border-2 rounded-xl uppercase border-neutral-700 p-3 text-center">
        <div>Hall da Fama</div>
        <small className="text-yellow-400">Beta Opened</small>
      </div>
      <div className="text-xs text-neutral-300 text-center uppercase mb-4">
        Click no personagem para visualizar o inventário e equipamentos
      </div>
      {characterSelected ? (
        <div className="flex flex-col items-center justify-center">
          <Button color="failure" onClick={() => setCharacterSelected(null)}>Fechar</Button>
          <Character character={characterSelected} />
        </div>
      ): (
        !loading ? (
          <Table className="border border-neutral-700 rounded-xl">
            <Table.Head>
              <Table.HeadCell className="dark:bg-neutral-800">#</Table.HeadCell>
              <Table.HeadCell className="dark:bg-neutral-800">Nick</Table.HeadCell>
              <Table.HeadCell className="dark:bg-neutral-800">Level</Table.HeadCell>
              <Table.HeadCell className="dark:bg-neutral-800">Classe</Table.HeadCell>
              <Table.HeadCell className="dark:bg-neutral-800">Evolução</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {ranking.map((character, index) => (
                <Table.Row
                  key={index}
                  onClick={() => setCharacterSelected(character)}
                  className={`
                      ${getKingdom(character.kingdom)}
                    border-neutral-800 hover:text-white hover:opacity-60 cursor-pointer
                    `}
                >
                  <Table.Cell>
                    <div className="w-5 block">
                      {(index + 1) + ((page - 1) * 6)}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="flex">
                    {character.nick}
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
                        <img src={getClassImage(character.class)} alt={character.class} className="w-5" />
                        <img src={getClassImage(character.sub_class)} alt={character.sub_class} className="w-5" />
                      </div>
                    ) : (
                      <img src={getClassImage(character.class)} alt={character.class} className="w-5" />
                    )}
                  </Table.Cell>
                  <Table.Cell>{character.evolution}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="text-center mx-auto mt-4">
            <Spinner size="xl" />
          </div>
        )
      )}
      <div className="flex justify-center overflow-hidden">
        {meta && !characterSelected && (
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
  );
}

export default RankingOpenedBeta;

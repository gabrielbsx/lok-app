import Equipment from './Equipment';
import Inventory from './Inventory';

interface IItem {
  id: number;
  effects: {
    effect: number;
    value: number;
  }[];
}

interface ICharacter {
  id: number;
  nick: string;
  level: number;
  experience: number;
  gold: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  strength: number;
  agility: number;
  intelligence: number;
  constituin: number;
  inventory: IItem[];
  equipment: IItem[];
}

function Character({ character }: { character: ICharacter }) {
  return (
    <div className="flex">
      <div className="flex-col p-4 bg-neutral-800/50 border-4 border-neutral-700 rounded-lg my-4">
        <div className="bg-neutral-800 py-1 text-center px-4 rounded-lg text-neutral-400 uppercase border-4 border-neutral-700">Inventário: {character.nick}</div>
        <Equipment equipment={character.equipment} />
        <Inventory inventory={character.inventory} />
      </div>
    </div>
  );
}

export default Character;

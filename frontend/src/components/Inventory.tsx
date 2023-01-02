import { Spinner, Tooltip } from 'flowbite-react';
import React, { useMemo, useState } from 'react';
import { Meta } from '../@types/Meta';
import api from '../services/api';

interface IItem {
  id: number;
  effects: {
    effect: number;
    value: number;
  }[];
}

function Inventory({ inventory }: { inventory: IItem[] }) {
  const [slot, setslot] = useState(0);

  const getSanc = (sanc: number) => {
    if ([232, 233, 234, 235, 236].includes(sanc)) return 11;
    if ([237, 238, 239, 240, 241].includes(sanc)) return 12;
    if ([242, 243, 244, 245, 246].includes(sanc)) return 13;
    if ([247, 248, 249, 250, 251].includes(sanc)) return 14;
    if ([252, 253, 254, 255, 256].includes(sanc)) return 15;
    return sanc;
  }

  const getEffect = (effect: any) => {
    if (effect.effect === 43) {
      return (
        <div className="absolute bg-neutral-900 rounded-xl text-xs bottom-0 right-0">
          +{getSanc(effect.value)}
        </div>
      );
    }
    if (effect.effect === 61) {
      return (
        <div className="absolute bg-neutral-900 rounded-xl text-xs bottom-0 right-0">
          x{effect.value}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-5 gap-1 bg-neutral-800 rounded-lg border-4 border-neutral-700 p-4">
        <div className="gap-2 flex-col flex">
          <div className="flex flex-row gap-1">
            {inventory && (
              inventory.slice(0 + (slot * 15), 5 + (slot * 15)).map((item: IItem, index: number) => (
                <div key={index} className="relative border-4 border-neutral-700 shadow-lg rounded-lg">
                  <img src={`/itemlist/${item.id}.jpg`} className="w-10 rounded-lg" />
                  {item.effects.map((effect, index) => getEffect(effect))}
                </div>
              ))
            )}
          </div>
          <div className="flex flex-row gap-1">
            {inventory && (
              inventory.slice(5 + (slot * 15), 10 + (slot * 15)).map((item: IItem, index: number) => (
                <div key={index} className="relative border-4 border-neutral-700 shadow-lg rounded-lg">
                  <img src={`/itemlist/${item.id}.jpg`} className="w-10 rounded-lg" />
                  {item.effects.map((effect, index) => getEffect(effect))}
                </div>
              ))
            )}
          </div>
          <div className="flex flex-row gap-1">
            {inventory && (
              inventory.slice(10 + (slot * 15), 15 + (slot * 15)).map((item: IItem, index: number) => (
                // <Tooltip
                //   content={
                //     <div className="flex flex-col gap-1">
                //       <span>Item {item.id}</span>
                //       <span>Efeitos:</span>
                //       <div className="flex flex-row gap-1">
                //         {item.effects.map((effect, index) => (
                //           <div key={index}>
                //             <span>{effect.effect}</span>
                //             <span>{effect.value}</span>
                //           </div>
                //         ))}
                //       </div>
                //     </div>
                //   }
                //   placement="right"
                // >
                  <div key={index} className="relative border-4 border-neutral-700 shadow-lg rounded-lg">
                    <img src={`/itemlist/${item.id}.jpg`} className="w-10 rounded-lg" />
                    {item.effects.map((effect, index) => getEffect(effect))}
                  </div>
                // </Tooltip>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center">
          <a onClick={() => setslot(0)} className={`border-2 border-neutral-700 shadow-lg rounded-lg px-3 py-1 text-neutral-200 hover:bg-neutral-700 ${slot === 0 ? 'bg-neutral-700' : ''}`}>1</a>
          <a onClick={() => setslot(1)} className={`border-2 border-neutral-700 shadow-lg rounded-lg px-3 py-1 text-neutral-200 hover:bg-neutral-700 ${slot === 1 ? 'bg-neutral-700' : ''}`}>2</a>
          <a onClick={() => setslot(2)} className={`border-2 border-neutral-700 shadow-lg rounded-lg px-3 py-1 text-neutral-200 hover:bg-neutral-700 ${slot === 2 ? 'bg-neutral-700' : ''}`}>3</a>
          <a onClick={() => setslot(3)} className={`border-2 border-neutral-700 shadow-lg rounded-lg px-3 py-1 text-neutral-200 hover:bg-neutral-700 ${slot === 3 ? 'bg-neutral-700' : ''}`}>4</a>
        </div>
      </div>
    </div>
  );
}

export default Inventory;

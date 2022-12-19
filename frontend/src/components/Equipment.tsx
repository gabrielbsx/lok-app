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

function Equipment({ equipment }: { equipment: IItem[] }) {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-5 mt-5 gap-1 bg-neutral-800 rounded-lg border-4 border-neutral-700 p-4">
        <div className="flex flex-col gap-1">
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[14].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[14].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[13].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[12].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[8].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[8].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[10].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[10].effects.map((effect, index) => getEffect(effect))}
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-around">
          <div className="border-4 mt-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[6].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[6].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 mb-14 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[4].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[4].effects.map((effect, index) => getEffect(effect))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[1].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[1].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[2].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[2].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 mb-10 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[3].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[3].effects.map((effect, index) => getEffect(effect))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <div className="border-4 border-neutral-700 mt-5 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[7].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[7].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[5].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[5].effects.map((effect, index) => getEffect(effect))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[15].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[15].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[12].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[13].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[9].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[9].effects.map((effect, index) => getEffect(effect))}
          </div>
          <div className="border-4 border-neutral-700 shadow-lg rounded-lg relative">
            <img src={`/itemlist/${equipment[11].id}.jpg`} className="w-10 rounded-lg" />
            {equipment[11].effects.map((effect, index) => getEffect(effect))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;

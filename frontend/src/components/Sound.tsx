import { HeartIcon } from '@heroicons/react/solid';
import { Add, PauseSharp, PlayArrow, Remove, VolumeUp, VolumeDown, VolumeMute } from '@material-ui/icons';
import { Modal } from 'flowbite-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Toujours from '../assets/audios/azran.mp3';
import Jurandir from '../assets/images/bm.gif';

function Sound(): JSX.Element {
    const [isPlayed, setIsPlayed] = useState<boolean>(false);
    const [sound, setSound] = useState<HTMLAudioElement>(new Audio(Toujours));
    const [modal, setModal] = useState<boolean>(false);
    sound.volume = 0.5;
    sound.loop = true;

    return (
        <>
            <div className="text-center my-4">
                <motion.div
                    animate={{
                    scale: [1, 1.1, 1, 1.1, 1],
                    transition: {
                        duration: 3,
                        times: [0, 0.2, 0.2],
                        loop: Infinity,
                    },
                    }}
                >
                <button
                    className="rounded-full p-1 border border-neutral-600 bg-neutral-700 hover:bg-neutral-800 hover:border-neutral-700 mx-1"
                    onClick={() => {
                        if (sound.volume < 0.9) {
                            sound.volume += 0.1;
                        }
                    }}
                >
                    <Add />
                </button>
                <button
                    className="rounded-full p-1 border border-neutral-600 bg-neutral-700 hover:bg-neutral-800 hover:border-neutral-700 mx-1"
                    onClick={() => {
                        if (sound.volume > 0.2) {
                            sound.volume -= 0.1;
                        }
                    }}
                >
                    <Remove />
                </button>
                <button
                    onClick={() => {
                        if (isPlayed) {
                            sound.pause();
                        } else {
                            sound.play();
                        }
                        setIsPlayed(!isPlayed);
                        setModal(!modal);
                    }}
                    className="rounded-full p-3 border border-neutral-600 bg-neutral-700 hover:bg-neutral-800 hover:border-neutral-700 ml-3"
                >
                    {!isPlayed ? (
                        <PlayArrow />
                    ): (
                        <PauseSharp />
                    )}
                </button>
                <span className="text-xs text-neutral-600 ml-4">
                    {!isPlayed ? 'Clique no play meu parceiro!' : <HeartIcon className="inline-block" width={25} />}
                </span>
                </motion.div>
            </div>
            {modal && (
                <div className="grid grid-cols-1 fixed top-1/2 right-0 -translate-y-1/2 -translate-x-10 z-50 shadow">
                    <img className="rounded-xl" src={Jurandir} alt="Jurandir cantou!" width={170} />
                    {/*
                        <div className="px-4 py-1 font-bold rounded-b-lg bg-neutral-700 text-center w-[183px] mt-2 -mx-10">
                            JURANDIR
                        </div>
                    */}
                </div>
            )}
        </>
    );
}

export default Sound;
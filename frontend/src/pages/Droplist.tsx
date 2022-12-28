import React from 'react';
import Droplist01 from '../assets/images/Droplist_01.png';
import Droplist02 from '../assets/images/Droplist_02.png';
import DroplistImg from '../assets/images/droplist_guide.png';

function Droplist() {
    return (
        <div className="bg-[#2B2B28] border border-[#E3B04B] px-4 py-4 w-3/4 mx-auto">
            <header className="font-bold text-white text-2xl pb-4 border-b border-[#E3B04B] text-center mb-4">
                <h1>Droplist</h1>
            </header>
            <section className="px-4 text-neutral-400">
                <div className="mt-5">
                    <h2 className="text-center font-bold">
                        Aguarde...
                    </h2>
                </div>
            </section>
        </div>
    );
}

export default Droplist;

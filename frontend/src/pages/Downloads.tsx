import { Button, Table } from 'flowbite-react';
import React from 'react';

function Downloads() {
    return (
        <>
            <div className="text-center font-bold text-4xl uppercase">
                Download do Jogo
            </div>
            <div>
                <div className="mt-4 mb-2 flex justify-center">
                    <a
                        className="button mx-2 bg-gradient-to-tr from-yellow-400 via-yellow-400 to-yellow-500 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl border-4 border-neutral-800"
                        href="https://www.mediafire.com/file/o04jrrhgtwhzfrz/WYD_Imperial_Instalador.exe/file"
                        target="_blank"
                    >
                        Link Direto
                    </a>
                    <a
                        className="button mx-2 bg-gradient-to-tr from-cyan-700 via-cyan-700 to-cyan-800 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl border-4 border-neutral-800"
                        href="https://www.sendspace.com/file/7jlxhh"
                        target="_blank"
                    >
                        Sendspace
                    </a>
                    <a
                        className="button mx-2 bg-gradient-to-tr from-red-700 via-red-700 to-red-800 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl border-4 border-neutral-800"
                        href="https://www.mediafire.com/file/o04jrrhgtwhzfrz/WYD_Imperial_Instalador.exe/file"
                        target="_blank"
                    >
                        Mediafire
                    </a>
                </div>

                <div className="text-left mt-5 font-bold text-2xl uppercase mb-2">
                    Requerimentos do Sistema
                </div>

                <Table>
                    <Table.Head>
                        <Table.HeadCell className="dark:bg-neutral-700"></Table.HeadCell>
                        <Table.HeadCell className="dark:bg-neutral-700">Mínimo</Table.HeadCell>
                        <Table.HeadCell className="dark:bg-neutral-700">Recomendado</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row className="bg-neutral-700/75">
                            <Table.Cell>
                                Processador
                            </Table.Cell>
                            <Table.Cell>
                                Pentium III 1,6GHz
                            </Table.Cell>
                            <Table.Cell>
                                Pentium 4 2.8GHz +
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-neutral-700/75">
                            <Table.Cell>
                                Memória RAM
                            </Table.Cell>
                            <Table.Cell>
                                512MB
                            </Table.Cell>
                            <Table.Cell>
                                1GB
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-neutral-700/75">
                            <Table.Cell>
                                Sistema
                            </Table.Cell>
                            <Table.Cell>
                                Windows XP
                            </Table.Cell>
                            <Table.Cell>
                                Windows 7, Windows 8, Winodws 10, Winodws 11
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-neutral-700/75">
                            <Table.Cell>
                                Placa de Vídeo
                            </Table.Cell>
                            <Table.Cell>
                                NVidia FX5200/ ATI Radeon9500
                            </Table.Cell>
                            <Table.Cell>
                                NVidia GeForce6600/ATI Radeon9800
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </>
    );
}

export default Downloads;
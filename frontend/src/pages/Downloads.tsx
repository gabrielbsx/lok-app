import { Button, Table, Card } from 'flowbite-react';
import React from 'react';

function Downloads() {
    return (
        <>                                      
            <div className="p-8 flex flex-row items-end justify-around border-y-4 border-yellow-500 py-5 bg-green-50/20" > {/* bg-green-50/20 */}
                <div className="max-w-sm">
                    <div className="text-start font-bold text-4xl uppercase mb-8">
                        Download  wyd
                    </div>
                    <Card imgSrc="https://wydglobal.raidhut.com/images/season02-banner.jpg">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Não perca tempo e baixe agora mesmo!
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Escolha sua melhor forma de download e comece sua aventura!
                        </p>
                        <a
                            className="flex justify-between
                            flexbutton bg-gradient-to-tr from-yellow-400 via-yellow-400 to-yellow-500 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl"
                            href="https://www.mediafire.com/file/o04jrrhgtwhzfrz/WYD_Imperial_Instalador.exe/file"
                            target="_blank"
                        >
                            Link Direto
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        <a
                            className="flex justify-between
                            button bg-gradient-to-tr from-cyan-700 via-cyan-700 to-cyan-800 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl"
                            href="https://www.sendspace.com/file/7jlxhh"
                            target="_blank"
                        >
                            Sendspace
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                        <a
                            className="flex justify-between
                            button bg-gradient-to-tr from-red-700 via-red-700 to-red-800 py-4 px-10 hover:bg-gradient-to-bl text-white font-black uppercase rounded-xl"
                            href="https://www.mediafire.com/file/o04jrrhgtwhzfrz/WYD_Imperial_Instalador.exe/file"
                            target="_blank"
                        >
                            Mediafire
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                    </Card>
                </div>
                <div>
                    <div className="text-left mt-5 font-bold text-2xl uppercase mb-8">
                        Requerimentos do Sistema
                    </div>

                    <Table className='border-8 border-stone-800'>
                        <Table.Head>
                            <Table.HeadCell className="bg-yellow-600"></Table.HeadCell>
                            <Table.HeadCell className="bg-yellow-600 text-slate-50 border-2 border-stone-800">Mínimo</Table.HeadCell>
                            <Table.HeadCell className="bg-yellow-600 text-slate-50 border-2 border-stone-800">Recomendado</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row className="bg-yellow-400">
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Processador
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Pentium III 1,6GHz
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Pentium 4 2.8GHz +
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-yellow-400">
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Memória RAM
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    512MB
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    1GB
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-yellow-400">
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Sistema
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Windows XP
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Windows 7, Windows 8, Winodws 10, Winodws 11
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-yellow-400">
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    Placa de Vídeo
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    NVidia FX5200/ ATI Radeon9500
                                </Table.Cell>
                                <Table.Cell className="text-slate-50 border-2 border-stone-800" >
                                    NVidia GeForce6600/ATI Radeon9800
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Downloads;
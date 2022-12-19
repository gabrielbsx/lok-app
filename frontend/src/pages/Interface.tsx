import { Divider } from '@material-ui/core';
import PrintScreen from '../assets/images/printscreen.png';
import Atalho01 from '../assets/images/atalhos_01.png';
import Atalho02 from '../assets/images/atalhos_02.png';
import Atalho03 from '../assets/images/atalhos_03.png';

function Interface(): JSX.Element {
    return (
        <div className="bg-neutral-800 border border-neutral-700 shadow px-4 py-4 rounded-lg">
            <header className="font-bold text-2xl pb-4 border-b border-neutral-700 text-center mb-4">
                <h1>Interface</h1>
            </header>
            <section className="px-4 text-neutral-400">
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        O que é interface?
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={PrintScreen} alt="Interface printscreen" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 01: Printscreen da interface completa do WYD.
                            </span>
                        </div>
                    </div>
                    <p>
                        Como em todo jogo, a interface é a apresentação inicial que o jogador
                        recebe para melhorar seu primeiro contato e facilitar no desenvolvimento
                        de sua jornada. Abaixo iremos apresentar um pouco dessa interface
                        e outras informações importantes:
                    </p>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div>
                        <ul className="list-decimal list-inside">
                            <li className="my-5">
                                Barra de HP: O valor do lado esquerdo da barra vermelho é
                                o seu HP atual, o valor do lado direito é o seu HP máximo.
                                A barra é localizada logo acima do personagem e pode ser
                                ativada/desativada (junto ao nome dos personagens da tela)
                                apertando a tecla "N".
                            </li>
                            <li className="my-5">
                                Barra de MP: O valor do lado esquerdo da barra azul é o
                                seu MP atual, o valor do lado direito é o seu MP máximo.
                                Assim como a barra de HP é localizada logo acima do personagem
                                e pode ser ativada/desativada (junto ao nome dos personagens da
                                tela) apertando a tecla "N".
                            </li>
                            <li className="my-5">
                                Barra de HP da Montaria: HP máximo é igual a barra amarela
                                completa, a barra de HP da montaria se encontra logo abaixo da barra de MP.
                            </li>
                            <li className="my-5">
                                Mini Mapa: Permite que você veja a sua localização ou a dos membros
                                do seu grupo. Atalho tecla "M".
                            </li>
                            <li className="my-5">
                                Indicadores de HP e HP da Montaria: Representação gráfica
                                localizada da quantidade de HP e HP de montaria que o jogador
                                possui no momento. Graças a esta barra o jogador não precisa
                                buscar as informações na barra principal (encontrada no canto
                                esquerdo superior da tela).
                            </li>
                            <li className="my-5">
                                Janela de Chat: Aperte a tecla "+" para aumentá-la,
                                tecle 'ENTER' para ativar o campo de inserção de texto.
                            </li>
                            <li className="my-5">
                                Quantidade de poção de HP no inventário: O menu de
                                macro (CC) permite ao jogador escolher a porcentagem
                                de HP/MP com que as poções serão utilizadas automaticamente,
                                além de possibilitar que o personagem entre em modo de combate automático.
                            </li>
                            <li className="my-5">
                                Barra de Experiência: Mostra experiência necessária até o próximo level.
                            </li>
                            <li className="my-5">
                                Barra de Skills: (Pode definir 10 skills no total, "1~10" ou
                                "F1~F10" pode ser usado para escolher entre as skills definidas.
                                A skill definida pode ser excluída da barra selecionando-a
                                e apertando a tecla "Del". As skills que funcionam no modo
                                automático de ataque podem ser distinguidos através da barra
                                em laranja acima do ícone da skill, podendo ser controlado
                                de 2~10 skills através da tecla " Y ".
                            </li>
                            <li className="my-5">
                                Barra de Menu do sistema: Possui vários botões da tela do jogo e opções.
                            </li>
                        </ul>
                    </div>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="grid grid-cols-1">
                        <h2 className="text-center uppercase font-bold">
                            Atalhos
                        </h2>
                        <div className="mx-auto">
                            <img className="rounded-xl my-3" src={Atalho01} alt="Atalhos de interface 01" />
                            <img className="rounded-xl my-3" src={Atalho02} alt="Atalhos de interface 02" />
                            <img className="rounded-xl my-3" src={Atalho03} alt="Atalhos de interface 03" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Interface;
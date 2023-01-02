import { Divider } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';
import HistoryGodsImage from '../assets/images/history_01.png';
import GodsCreateImage from '../assets/images/history_02.png';
import CelestialBattleImage from '../assets/images/history_03.png';
import WarImage from '../assets/images/history_04.png';
import WarriorImage from '../assets/images/history_05.png';

function History(): JSX.Element {
    return (
        <div className="bg-neutral-800 border border-neutral-700 shadow px-4 py-4 rounded-lg">
            <header className="font-bold text-2xl pb-4 border-b border-neutral-700 text-center mb-4">
                <h1>História</h1>
            </header>
            <section className="px-4 text-neutral-400">
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        Início dos tempos
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={HistoryGodsImage} alt="Gods of kersef" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 01: Os grandes portões de armia.
                            </span>
                        </div>
                    </div>
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Sente ai e escute a nossa história e nada de gracinhas ou eu vou ter que
                        enfiar um pouco de respeito na sua cabeça com a minha bengala...
                        Bem melhor assim, agora pegue um pouco de vinho e cale a boca.
                        Eu vou contar a história do nosso povo... e preste muita atenção porque
                        eu não vou repetir
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Antes mesmo de existir a mais antiga estrela no céu e de os mundos povoarem o universo,
                        dois seres supremos já existiam; seres mais antigos que a própria criação.
                        Seus nomes são impronunciáveis em nossa língua, por isso os chamamos de Yetzirah e Tzfah.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Na primeira união desses dois seres, não só a Terra foi criada, mas também os primeiros
                        seres humanos e toda a flora e fauna do planeta. E assim, a humanidade começou a povoar a Terra.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Yetzirah, que começou a amar seus filhos, resolveu construir um local para sempre estar perto
                        deles esse local foi chamado de Hekalote, a Morada dos Deuses, e desse lugar ela cuidava da
                        humanidade. Com o passar dos tempos, começaram a formar-se tribos que se fundiram e evoluíram,
                        organizando-se em um reino central, onde tudo era estudado e praticado: política, ciência, arte,
                        economia, pois tudo fazia parte do processo de evolução...
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        E Tzfah passou a odiar a humanidade, pois eles haviam conquistado algo que nunca tinha sido dele, o amor de Yetzirah.
                        <FormatQuote className="text-neutral-500" />
                    </p>
                </div>
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        Criação dos Deuses
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={GodsCreateImage} alt="God's create" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 02: A luta entre o grande guerreiro e o dragão vermelho.
                            </span>
                        </div>
                    </div>
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Isso mesmo, seu cabeça oca, nos nunca tivemos permissão para rezar para os seres supremos.
                        Eles não precisam das nossas orações, só rezávamos para os deuses, mas isso não faz mais diferença.
                        Os deuses não podem mais escutar nossos cânticos de louvor porque a ponte Sephira foi destruída.
                        O que é a ponte Sephira? Se você passasse menos tempo falando e mais tempo ouvindo,
                        talvez soubesse a história... agora, coloque mais lenha no fogo, estou congelando até os ossos...
                        <FormatQuote className="text-neutral-500" />
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Depois da criação dos humanos, Yetzirah e Tzfah se uniram mais 5 vezes,
                        e de cada união foi criado um deus: Kafma, Armia, Daleth, Samech e Haden.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Quando os deuses nasceram, Tzfah percebeu o terrível erro que cometera,
                        pois, assim que seus filhos crescessem,
                        eles se uniriam e o matariam em nome de sua mãe e por amor aos humanos.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Tão logo os deuses despertaram Tzfah, que não podia matá-los,
                        os trancou num campo de êxtase, de onde eles nunca sairiam.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Agora o ódio de Tzfah era ainda maior,
                        uma vez que a semente do ciúme e da ira tinham germinado no âmago de seu ser,
                        e sua fúria se voltou contra os humanos. Terremotos,
                        vulcões e outros desastres assolavam a Terra e hordas de monstros que atacavam vilas e cidades,
                        matando tudo que encontravam. E, apesar de tudo que Yetzirah tinha ensinado para os humanos,
                        eles nada podiam fazer.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Os deuses, que compartilhavam o amor de sua mãe pelos humanos,
                        se compadeceram da desgraça que se abatia sobre a humanidade e,
                        mesmo presos, começaram a moldar a energia de alguns humanos,
                        fazendo com que chegassem ao ápice do poder que seus corpos poderiam
                        aguentar enquanto Yetzirah elaborava um plano para libertar seus filhos
                        e salvar a humanidade.
                    </p>
                </div>
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        A Batalha Celestial
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={CelestialBattleImage} alt="Celetial's Battle" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 03: O nascimento do grande guerreiro celestial.
                            </span>
                        </div>
                    </div>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Você não se cansa de fazer perguntas idiotas?
                        Nós sabemos de tudo isso porque graças a batalha celestial,
                        as informações sobre a criação do mundo e sobre o segredo dos deuses caíram aqui na Terra,
                        e é por isso que alguns de nós conseguimos fazer magias e manipular a energia dos espíritos.
                        No fundo, eu acho que era isso que os deuses queriam desde o começo.
                        Não, você não pode perguntar mais nada,
                        agora deixe-me continuar antes que eu me irrite com a sua burrice...
                        <FormatQuote className="text-neutral-500" />
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Enquanto os deuses secretamente fortificavam os humanos,
                        Yetzirah enfraquecia cada vez mais a prisão dos filhos,
                        ambos sabendo que teriam que unir forças para acabar com a tirania de Tzfah,
                        que, consumido pela chama do ódio e da inveja,
                        tinha escravizado quase toda a população humana.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        No instante em que os deuses finalmente conseguiram se libertar,
                        a batalha começou. Liderados por Armia e Kafma e tendo a ajuda de Yetzirah,
                        os deuses investiram com uma fúria jamais vista para finalmente livrar
                        o mundo do maligno Tzfah.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        O impacto da batalha pôde ser sentido tanto por humanos quanto pelos monstros,
                        mas apenas os escolhidos sabiam que a hora tinha chegado e que eles precisavam
                        ajudar os deuses. Para que os humanos pudessem chegar até Hekalote,
                        Daleth criou a ponte Sephira, que ligava o mundo mortal ao reino divino,
                        assim, aqueles que tinha sido tocados pela essência divina conseguiriam chegar
                        a Morada dos Deuses para batalhar pelo destino de toda a humanidade.
                        Esses humanos receberam o nome de Arch.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Tzfah, porém, também criara seu próprio exército,
                        um exército tocado pela mácula do ódio e,
                        se aproveitando da situação, ordenou que suas tropas destruíssem todo e qualquer ser humano,
                        pois agora os deuses e Yetzirah estavam ocupados demais para se preocupar com qualquer
                        coisa além da batalha.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Rios de sangue corriam, irrigando a terra e gerando ainda mais monstros
                        e sofrimento para o povo humano,
                        que sem seus defensores parecia não ter escapatória,
                        finalmente os humanos seriam exterminados.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        A única maneira encontrada pelos deuses para acabar com essa loucura
                        era banindo Tzfah do reino divino e o aprisionando no centro da Terra,
                        de onde ele nunca poderia escapar, e foi isso que os deuses fizeram.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Quando Tzfah foi arremessado a Terra, numa atitude desesperada ele quebrou a ponte Sephira,
                        impedindo os deuses de completar o encantamento.
                        Isso o deixou num estado de semiconsciência,
                        mas ainda livre para influenciar sua legião maligna para dominar a Terra.
                    </p>
                </div>
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        A Guerra Continental
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={WarImage} alt="Continental war's" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 04: A devastação da grande guerra continental.
                            </span>
                        </div>
                    </div>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Sim, isso mesmo, a fúria de Tzfah foi direcionada para os deuses e para a sua antiga amante Yetzirah,
                        mas não se esqueça que de todos os motivos que Tzfah tinha para cometer tamanha loucura,
                        os humanos estão em primeiros da lista, e se você acha que a guerra limitou-se ao mundo celestial,
                        você e mais lerdo do que eu pensava. Os deuses nos ajudaram muito e como pagamos a eles?
                        Os transformando em meros seres para testes, e nessas horas que eu não tenho orgulho de ser um humano.
                        <FormatQuote className="text-neutral-500" />
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Por causa da guerra Celestial,
                        os humanos começam ficar sabendo do sistema do mundo e os segredos do céu.
                        Isso fez com que os humanos em vez de louvar os deuses,
                        começam a analisar-los, ou seja, eles tornaram-se cobaias de estudos como qualquer
                        outro elemento da natureza. Depois de muita analise e estudos,
                        os humanos finalmente conseguiram compreender a fonte de poder dos estilhaços da ponte Sephira,
                        e com as descobertas certas, poderiam ser criados encantamentos que ajudariam os humanos nessa guerra.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Mas a ganância e sede de poder sempre falam mais alto...
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Um dos magos que estavam estudando os poderes mágicos da Sephira
                        foi tomado por uma arrogância sem precedentes,
                        se considerando mais poderoso que os próprios deuses,
                        agora que já entendia como funcionavam seus poderes,
                        seu nome era Nershess, da cidade de Koren.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Tzfah percebeu a macula na alma de Nesse e o convocou para
                        lutar ao seu lado nessa guerra, juntos eles invadiram Armia,
                        o centro sagrado do continente.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        O exército de Tzfah e solto em terras humanas,
                        infestando diversas cidades no mundo,
                        levando o desespero para todos e as cidades que não
                        sofreram invasão dos monstros sofrem perante a magia maligna de Nershess.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        A única maneira encontrada pelos deuses para acabar com essa loucura
                        era banindo Tzfah do reino divino e o aprisionando no centro da Terra,
                        de onde ele nunca poderia escapar, e foi isso que os deuses fizeram.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Mas ele não contava que o poder que se desprendeu da ponte, por sua vez,
                        influenciasse diretamente nos humanos,
                        criando mortais capazes de se defenderem dos monstros de Tzfah,
                        e fosse encarado como o ultimo presente dos deuses para seus queridos humanos,
                        pois agora eles não mais poderiam tomar conta da Terra,
                        uma vez que sua ligação foi encerrada com a quebra da ponte Sephira,
                        podendo interferir apenas cedendo um pouco de poder para aqueles que realmente acreditam.
                    </p>
                </div>
                <div className="mt-10">
                    <h2 className="text-center uppercase font-bold">
                        Nos Dias De Hoje
                    </h2>
                    <Divider className="w-100 my-4 bg-neutral-700" />
                    <div className="mb-4 grid grid-cols-1 items-center">
                        <div className="mx-auto">
                            <img className="rounded-xl" src={WarriorImage} alt="The born of warrior" />
                        </div>
                        <div className="mx-auto">
                            <span className="text-xs text-right">
                                Imagem 05: O nascimento do grande guerreiro.
                            </span>
                        </div>
                    </div>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Parece que finalmente eu consegui sua atenção...
                        a juventude de hoje só presta atenção em historias quando
                        elas são sangrentas e cheias de guerra.
                        Não fiquei ai me olhando com cara de bobo,
                        essa historia aconteceu mesmo.
                        Ou você está me chamando de mentiroso? Eu posso estar velho,
                        mas ainda consigo ensinar boas maneiras para uma criança cheia de confiança.
                        <FormatQuote className="text-neutral-500" />
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        400 anos depois e o mundo não se recuperou totalmente da guerra celestial,
                        os humanos estão novamente se organizando em grandes cidades,
                        voltando a estudar magia, se reorganizando em grandes reinos e rezando para a volta dos deuses.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Embora o poder dos Arch, hoje em dia, seja apenas uma lenda,
                        muitos guerreiros saem em busca desse poder adormecido no coração e na alma da humanidade.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        Não se sabe ao certo quando ou se os deuses voltarão,
                        até lá os humanos tem de lutar com toda a vontade para
                        livrar a Terra do mal que Tzfah fez e ainda faz.
                    </p>
                    <Divider className="w-100 my-2 bg-transparent" />
                    <p>
                        <FormatQuote className="text-neutral-500" />
                        Isso é tudo o que eu tenho para lhe contar,
                        se você acha que tem o necessário para seguir seu destino,
                        vá em frente, mas não pense que será uma jornada fácil,
                        muito desistem no meio do caminho,
                        outros não tem tanta sorte e acabam morrendo em combate
                        contra um monstro qualquer, mas acredite no seu destino,
                        e se ele for bom com você, quem sabe não será você o responsável
                        por tornar a história dos Arch real novamente?
                        <FormatQuote className="text-neutral-500" />
                    </p>
                </div>
            </section>
        </div>
    );
}

export default History;
import { Divider } from '@material-ui/core';
import { ArrowRight } from '@material-ui/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const rules = `
- Confira nossas regras e termos para evitar possíveis banimentos e/ou punições futuras.
- Você aceitará estas regras no momento em que fizer seu cadastro.
- As Regras poderão ser modificadas pela administração a qualquer momento, será notificado antes e após a modificação.
- A administração se reserva ao direito de encerrar qualquer caso não haja o cumprimento destas regras.
- Além destas regras, você deve ter em mente o respeito ao direito dos outros de aproveitar corretamente o jogo.

1. OFENSAS
    1. Você não poderá atormentar, perseguir, ameaçar, causar aﬂição e/ou chamar atenção indesejada a outros usuários;
    2. Você não poderá fazer apologia a comportamentos considerados extremos na vida real, incluindo (mas não se limitando a) atos violentos, tortura, tráfico, violência sexual, crimes, entre outros;
    3. Você não poderá promover qualquer distinção, exclusão, restrição ou usar de linguagem ou termos que tenham o propósito de humilhar, insultar, prejudicar, difamar ou disseminar o ódio em relação a outros usuários ou grupos de usuários, baseado em discriminação por questões étnicas;
    4. Você não poderá se filiar, organizar ou ser membro de nenhuma espécie de grupo em Wyd cujo nome seja baseado ou fundamentado em uma filosofia racista.

2. DESRESPEITO A STAFF
    1. Caso seja contatado por um do Administrador (ADM) ou Game Master (GM) enquanto se encontra no ambiente de jogo, você deverá seguir todas as suas instruções;;
    2. Você não pode dificultar ou impedir o trabalho da equipe;
    3. Você não pode insultar, ofender, humilhar, atormentar, usar de comentários irônicos, sarcásticos, jocosos ou questionar de maneira abusiva um membro da equipe durante o desempenho de suas funções. Caso necessário, o membro da equipe poderá tomar qualquer medida temporária que achar apropriada com o jogador para manter a ordem;;
    4. Nossa equipe não solicita aos usuários dados de cadastro, tais como senha da sua conta ou itens (tanto in game quanto nas redes sociais);;

3. REPRESENTAÇÃO
3.1 – Você não pode se fazer passar por nenhum amigo, parente ou funcionário da administração, ou por representante de suporte a usuários;
3.2 – Você não pode se passar por outro usuário;
3.3 – Você não pode criar um personagem ou usar qualquer identificação no jogo que possa ser confundida com identificações criadas ou usadas pela administração para efetuar operações no jogo, como suporte, testes ou verificação do serviço.

4. ANÚNCIOS IRREGULARES
4.1 – Você não pode fazer marketing, promoção comercial, anúncios ou solicitações com intuito comercial($) dentro do jogo;
4.2 – Você não pode anunciar ou transferir o acesso a qualquer conta, seja por dinheiro real, itens, produtos, gold , jogos ou por troca de ajuda em qualquer canal de comunicação do jogo;

5. ATIVIDADE IRREGULAR
    1. Você não pode modificar nenhuma parte do Client e/ou arquivos do WYD ou do Servidor de forma a alterar o funcionamento de itens ou do jogo de modo geral, inclusive alterações visuais;
    2. Você não pode usar ou beneficiar qualquer personagem ou conta de jogo por meio do uso de programas irregulares (ex.: BOT, Hacks, etc.);
    3. Você não pode utilizar ou se beneficiar, direta ou indiretamente, de nenhum tipo de bug para o uso indevido do sistema em WYD;
    4. Você não pode se associar a outros usuários que usem programas irregulares de forma a se beneficiar direta ou indiretamente. Em caso de denúncias comprovadas ou flagrantes por parte da equipe de monitoramento do jogo, a punição será aplicada a todos os usuários envolvidos, sem distinção;

6. CONDUTA
    1. CONDUTA GERAL
        1. Você deverá seguir as instruções da equipe autorizada (ADM e GM) quando estiver em WYD;
        2. Você não pode fornecer informações falsas ou esconder intencionalmente qualquer tipo de informação ao registrar sua conta de WYD;
        3. Você não poderá enviar informações falsas para a Administração por meio de Ticket ou qualquer outro meio de comunicação; isso inclui (mas não se restringe a) comunicar qualquer tipo de informação que não seja verdade com a intenção de se beneficiar com itens, gold , valores, promoções, eventos ou qualquer produto oferecido pelo jogo;
        4. Visando a segurança das contas, a administração se reserva o direito de bloquear as contas dos usuários em caráter preventivo, para averiguar toda e qualquer suspeita de irregularidade, solicitando, assim, informações sobre qualquer atividade exercida pelo usuário dentro do jogo. A Staff tem o período de até 30 dias para liberação da conta a partir do momento em que essas informações forem enviadas, sem obrigar-se a compensar a conta pelo período em que esteve bloqueada;
        5. Prezando pela segurança de todos os usuários, caso sejam detectados programas irregulares que modifiquem ou que tentem funcionar em conjunto com o Software durante o seu acesso e/ou conexão do servidor, a Staff poderá bloquear a conta de jogo detectada pelo sistema automaticamente por 7 dias (aumentando o tempo conforme a gravidade) sem obrigar-se a compensar a conta pelo período em que esteve bloqueada. O bloqueio da conta poderá se repetir sempre que a irregularidade for detectada;
        6. Caso a ação desrespeite mais de uma regra, a mais severa prevalecerá;
        7. As denúncias devem ser efetuadas no período de até 15 dias após a data da screenshot ou vídeo, caso contrário, ela será anulada;
        8. A Staff, se reserva o direito de alterar o status e funcionamento de quaisquer itens, assim como habilidades e atributos de personagens e mecânicas do jogo sem obrigar-se a compensar a conta pela alteração. Vale lembrar que os itens, habilidades, atributos e mecânicas do jogo podem ser “bufados”* ou “nerfados”* por conta de atualizações/updates ou para garantir o equilíbrio do jogo;
    *Entende-se por “bufado” itens que tiveram seus atributos melhorados e “nerfados” itens que tiveram seus atributos diminuídos.
        9. O jogo dispõe de um sistema de segurança que aplica ações de bloqueio e reset de senhas em contas que apresentam comportamento incomum. Este sistema visa proporcionar proteção para o ambiente de jogo e para as contas envolvidas;

    2. CONDUTA INADEQUEADA
        1. Você é inteiramente responsável pelo que faz com a sua conta no jogo. Dito isto, não nos responsabilizamos por quaisquer problemas decorrentes de compartilhamento de sua conta com outra pessoa.
        2. Qualquer conduta que possa ser considerada de "má fé" ou anti-jogo, será passiva de punição.
        3. A equipe não se responsabiliza por itens perdidos por erro do jogador. Casos de itens perdidos em decorrência de bugs e erros do servidor serão resolvidos apenas através de ticket no suporte.
        4. Em casos de análises de conta decorrente de roubo, a conta será congelada até o final da análise. A equipe não se responsabiliza por itens perdidos durante o tempo da análise. O jogador pode solicitar uma análise para a sua conta através de ticket no suporte, mediante ciência dos termos acima.

7. DENÚNCIAS
    1. Denúncias devem ser feitas obrigatóriamente via suporte pelo Discord, Facebook ou Site, sendo necessárias as seguintes informações: screenshot de toda a tela do jogo com minimapa aberto, janela de chat aberto, data e hora através do botão “insert” do teclado, breve resumo em texto no ticket do ocorrido, e demais informações que facilitem para a equipe de suporte analisar o caso;
    2. Use o bom senso no momento da denúncia, faça apenas em casos realmente graves para que não haja um acumulo de denúncias levianas;
    3. Em caso de denúncias de bugs, é preciso informar com maior riqueza de detalhes como o mesmo ocorre para que a equipe entanda o padrão e assim faça a correção do mesmo, sempre anexando screenshots para facilitar a compreensão;
    4. Em caso de denúncias referentes a ofensas, será analisado todo o contexto e, se comprovado pela equipe que a má conduta também existiu da parte reclamante, ambos os jogadores serão punidos igualmente;
    5. As ofensas ou quaisquer outras formas de má condutas denunciadas serão analisadas pela equipe e a devida punição será dada de acordo com o entendimento da gravidade do caso, podendo o nível da punição ser variável.

8. DOAÇÕES
    1. O With Your Destiny Imperial é aberto e gratuíto, livre de pagamentos;
    2. Entende-se que a doação é voluntária e não é reembolsável e nem contestável em nenhum momento;
    3. O doador não está excluso das regras, todos são tratados por igual sendo doador ou não;
    4. Qualquer tentativa de fraude ao sistema de doação irá conduzir a punição de sua conta permanente;
    5. Depois que você escolher o item não poderá mais trocar por outro e também não poderá transferir de conta! As entregas de doações é somente com o Administrador;
    6. Todas as doações que são feitas ao servidor são salvas em nosso banco de dados;
    7. Após uma doação por depósito em conta é extremamente obrigatório efetuar a confirmação.
`;
function Rules(): JSX.Element {
    return (
        <div className="p-3 from-neutral-700 mx-16">
            <header className="uppercase font-bold text-xl py-8 text-center text-white">
                <h1>Regras</h1>
            </header>
            <section className="p-4 bg-[#2B2B28] border border-[#FFD369]">
                <ReactMarkdown
                    remarkPlugins={[gfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="prose prose-invert mx-auto max-w-none"
                >{rules.replace(/\n/g, '  \n')}</ReactMarkdown>
            </section>
        </div>
    );
}

export default Rules;
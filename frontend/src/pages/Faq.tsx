import { Accordion, ListGroup } from 'flowbite-react';
import { HiCurrencyDollar, HiUsers } from 'react-icons/hi';
import { FaQuestion } from 'react-icons/fa';
import { BsBugFill } from 'react-icons/bs';
import { useState } from 'react';
import FaqGame from '../components/FaqGame';
import FaqDonate from '../components/FaqDonate';

type ListItems = {
    title: string;
    state: boolean;
    icon: any; //IconType
    faq: React.ReactNode;

};

function Faq() {
    const [listMenu, setListMenu] = useState<ListItems[]>([
        { title: 'O Jogo', state: true, icon: HiUsers, faq: <FaqGame /> },
        { title: 'Doações', state: false, icon: HiCurrencyDollar, faq: <FaqDonate /> },
        { title: 'Dúvidas Frequentes', state: false, icon: FaQuestion, faq: <FaqDonate /> },
        { title: 'Soluções e Problemas', state: false, icon: BsBugFill, faq: <FaqGame /> },
    ]);

    const onHandleListClick = (title: string) => {
        setListMenu(
            listMenu.map((item: ListItems) => ({ ...item, state: item.title === title ? !item.state : false }))
        );
    };

    return (
        <>
            <div className="bg-neutral-700/50 rounded-lg">
                <div className="grid grid-cols-4 gap-5 p-5">
                    <div className="col-span-1">
                        <ListGroup>
                            {listMenu.map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    active={item.state}
                                    icon={item.icon}
                                    onClick={() => onHandleListClick(item.title)}
                                >
                                    {item.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="col-span-3">
                        {listMenu.map((item, index) => (
                            item.state && item.faq
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Faq;
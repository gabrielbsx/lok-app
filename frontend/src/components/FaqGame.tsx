import { Accordion } from 'flowbite-react';

function FaqGame(): JSX.Element {
    return (
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>
                    Como criar conta?
                </Accordion.Title>
                <Accordion.Content>
                    content 1
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Como baixar o WYD Imperial?
                </Accordion.Title>
                <Accordion.Content>
                    content 2
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Como baixar o WYD Imperial?
                </Accordion.Title>
                <Accordion.Content>
                    content 2
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default FaqGame;
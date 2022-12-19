import { Accordion } from 'flowbite-react';

function FaqDonate(): JSX.Element {
    return (
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>
                    Teste
                </Accordion.Title>
                <Accordion.Content>
                    content 1
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Teste 2
                </Accordion.Title>
                <Accordion.Content>
                    content 2
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Teste 3
                </Accordion.Title>
                <Accordion.Content>
                    content 2
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}

export default FaqDonate;
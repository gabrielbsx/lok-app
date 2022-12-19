import { Footer } from 'flowbite-react';

function FooterCompenent() {
    return (
        <div className="md:mt-14 m-0 mt-5 flex">
            <Footer container={true} >
                <div className="w-full text-center">
                    <Footer.Copyright
                        href="#"
                        by="WYD IMPERIAL"
                        year={2022}
                    />
                    <span className="text-xs text-neutral-400 uppercase">
                        Desenvolvido por Gabriel Barbosa.
                    </span>
                </div>
            </Footer>
        </div>
    );
}

export default FooterCompenent;
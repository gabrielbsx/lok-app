import { Divider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Contact(): JSX.Element {
    return (
        <div className='flex justify-center'>
            <div className="w-2/4 border border-[#FFD369] bg-[#2B2B28] px-4 py-4">
                <header className="text-white border-b border-[#FFD369] text-2xl font-bold text-center uppercase">
                    <h1>Contato</h1>
                </header>
                <section className="px-4 text-neutral-400 pb-6 pt-2">
                    <div className="mt-5 text-center">
                        {/* <a target="_blank" href="https://www.facebook.com/ApologyGame" className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg mx-2">
                        <FontAwesomeIcon icon={faFacebook} />
                        <span className="ml-3">
                            Facebook
                        </span>
                    </a> */}
                        <a target="_blank" href="https://discord.gg/XtYatPJCxh" className="text-white bg-[#39311D] hover:hover:bg-[#292929]/50 px-4 py-2 rounded-lg mx-2">
                            <FontAwesomeIcon icon={faDiscord} />
                            <span className="ml-3">
                                Discord
                            </span>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Contact;
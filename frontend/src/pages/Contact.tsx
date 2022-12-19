import { Divider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Contact(): JSX.Element {
    return (
        <div className="bg-neutral-800 border border-neutral-700 shadow px-4 py-4 rounded-lg">
            <header className="border-b border-neutral-600 text-2xl font-bold text-center uppercase">
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
                    <a target="_blank" href="https://discord.gg/XtYatPJCxh" className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg mx-2">
                        <FontAwesomeIcon icon={faDiscord} />
                        <span className="ml-3">
                            Discord
                        </span>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Contact;
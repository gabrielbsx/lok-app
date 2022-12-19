import { useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, Spinner } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { setUser } from '../redux/reducers/user.reducer';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '../services/api';
import Logo from '../assets/images/logo.png';
import { Helmet } from 'react-helmet';

type IResponseLogout = {
    statusCode: number;
    message: string;
};

function Menu() {
    const path = window.location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);

    const logoutHandle = async () => {
        try {
            const { data } = await api.delete<IResponseLogout>('/users/logout');
            if (data.statusCode === 200) {
                localStorage.removeItem('token');
                dispatch(setUser(null));
                toast.dark(data.message, {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/');
            }
        } catch (error) {
            error as Error | AxiosError;
        }
    }

    const user = useSelector((store: RootState) => store.user.user);
    const page = path.split('/')[1] === '' ? 'home' : path.split('/')[1];

    return (
        <div className="m-0 z-10">
            <Helmet>
                <title>WYD Imperial - {page}</title>
                <meta name="description" content={`WYD Imperial - ${page}`} />
                <meta name="keywords" content="WYD Imperial - Home, With Your Destiny, WYD, MMORPG, WYDBR, WYD BR, WYD ONLINE" />
                <meta name="author" content="WYD Imperial" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={`WYD Imperial - ${page}`} />
                <meta property="og:description" content="WYD Imperial - Home" />
                <meta property="og:image" content="https://wydimperial.com.br/assets/images/logo.png" />
                <meta property="og:url" content="https://wydimperial.com.br" />
                <meta property="og:site_name" content="WYD Imperial" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:locale:alternate" content="en_US" />
                <meta property="og:locale:alternate" content="es_ES" />
            </Helmet>
            <Navbar
                fluid={false}
                rounded={true}
            >
                <Navbar.Brand onClick={() => navigate('/')}>
                    <img
                        src={Logo}
                        className="mr-3 h-6 sm:h-12 cursor-pointer"
                        alt="Imperial Logo"
                    />
                </Navbar.Brand>
                <div className="flex flex-wrap gap-2 md:order-2">
                    {/*<DarkThemeToggle />*/}
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={localStorage.getItem('token') !== null ? (
                            <Avatar
                                alt="User settings"
                                rounded={true}
                                status="offline"
                            />
                        ) : (
                            <div className="bg-neutral-700 border-4 hover:bg-neutral-900 border-neutral-500 shadow p-2 text-neutral-200 rounded-2xl">
                                <UserIcon className="h-5 w-5" />
                                <span className="hidden">
                                    Painel de Controle
                                </span>
                            </div>
                        )}
                    >
                        {localStorage.getItem('token') !== null && user ? (
                            <div>
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        <strong>
                                            <span className="text-neutral-700 dark:text-white">
                                                {user.name || 'Sem nome'}
                                            </span>
                                        </strong>
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {user.email || 'Sem e-mail'}
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item onClick={() => navigate('/profile')}>
                                    <Link to="/profile">
                                        Perfil
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/donation')}>
                                    <Link to="/donation">
                                        Doação
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/guildmark')}>
                                    <Link to="/guildmark">
                                        Guildmark
                                    </Link>
                                </Dropdown.Item>
                                {user!.access_level === 'Admin' && (
                                    <>
                                        <Dropdown.Divider />
                                        <div className="py-1 text-neutral-400 text-center">
                                            Administração
                                        </div>
                                        <Dropdown.Item onClick={() => navigate('/admin/news')}>
                                            <Link to="/admin/news">
                                                Notícias
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/admin/donate')}>
                                            <Link to="/admin/donate">
                                                Doação
                                            </Link>
                                        </Dropdown.Item>
                                    </>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logoutHandle}>
                                    Sair
                                </Dropdown.Item>
                            </div>
                        ) : (
                            <div>
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        <strong>
                                            <span className="text-neutral-700 dark:text-white">
                                                Painel de Usuário
                                            </span>
                                        </strong>
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        Acesse sua conta para continuar
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item onClick={() => navigate('/sign-in')}>
                                    <Link className={path === '/sign-in' ? 'text-blue-400' : ''} to="/sign-in">
                                        Entrar
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/sign-up')}>
                                    <Link className={path === '/sign-up' ? 'text-blue-400' : 'text-neutral-300'} to="/sign-up">
                                        Cadastrar
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/recovery-password')}>
                                    <Link className={path === '/recovery-password' ? 'text-blue-400' : ''} to="/recovery-password">
                                        Recuperar Senha
                                    </Link>
                                </Dropdown.Item>
                            </div>
                        )}
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <div className="items-center flex gap-4 md:flex-row flex-col">
                        <Link className={`px-4 py-2 rounded-lg hover:bg-neutral-700 ${location.pathname === '/' ? "bg-neutral-600" : ""}`} to="/">
                            Início
                        </Link>
                        <Link className={`px-4 py-2 rounded-lg hover:bg-neutral-700 ${location.pathname === '/news' ? "bg-neutral-600" : ""}`} to="/news">
                            Notícias
                        </Link>
                        <Link className={`px-4 py-2 rounded-lg hover:bg-neutral-700 ${location.pathname === '/downloads' ? "bg-neutral-600" : ""}`} to="/downloads">
                            Baixar
                        </Link>
                        <Link className={`px-4 py-2 rounded-lg hover:bg-neutral-700 ${location.pathname === '/donate' ? "bg-neutral-600" : ""}`} to="/donate">
                            Doação
                        </Link>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            label="O Jogo"
                        >
                            <Dropdown.Item onClick={() => navigate('/history')}>
                                <Link className={location.pathname === '/history' ? "text-neutral-400" : ""} to="/history">
                                    História
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/interface')}>
                                <Link className={location.pathname === '/interface' ? "text-neutral-400" : ""} to="/interface">
                                    Interface
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/rules')}>
                                <Link className={location.pathname === '/rules' ? "text-neutral-400" : ""} to="/rules">
                                    Regras
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/tutoriais')}>
                                <Link className={location.pathname === '/tutorials' ? "text-neutral-400" : ""} to="/tutorials">
                                    Tutoriais
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/droplist')}>
                                <Link className={location.pathname === '/droplist' ? "text-neutral-400" : ""} to="/droplist">
                                    Lista de Drop
                                </Link>
                            </Dropdown.Item>
                        </Dropdown>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            label="Suporte"
                        >
                            {/* <Dropdown.Item onClick={() => navigate('/faq')}>
                                    <Link className={location.pathname === '/faq' ? "text-red-400" : ""} to="/faq">
                                        FAQ
                                    </Link>
                                </Dropdown.Item> */}
                            {/* <Dropdown.Item onClick={() => navigate('/support')}>
                                    <Link className={location.pathname === '/support' ? "text-red-400" : ""} to="/support">
                                        Suporte
                                    </Link>
                                </Dropdown.Item> */}
                            <Dropdown.Item onClick={() => navigate('/contact')}>
                                <Link className={location.pathname === '/contact' ? "text-neutral-400" : ""} to="/contact">
                                    Contato
                                </Link>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            {loading && (
                <div className="text-center mt-8">
                    <Spinner aria-label="Extra large spinner" size="xl" />
                </div>
            )}
        </div>
    );
}

export default Menu;
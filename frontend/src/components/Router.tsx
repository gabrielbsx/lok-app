import{ useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Donate from '../pages/Donate';
import Downloads from '../pages/Downloads';
import Droplist from '../pages/Droplist';
import Game from '../pages/Game';
import Home from '../pages/Home';
import News from '../pages/News';
import AdminNews from '../pages/admin/News';
import Profile from '../pages/Profile';
import Recovery from '../pages/Recovery';
import Rules from '../pages/Rules';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Menu from './Menu';
import AdminEditNews from '../pages/admin/News/Edit';
import { RootState } from '../redux/reducer';
import SingleNews from '../pages/SingleNews';
import History from '../pages/History';
import Interface from '../pages/Interface';
import Guildmark from '../pages/Guildmark';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import DonateAdmin from '../pages/admin/Donate';
import AdminEditPackage from '../pages/admin/Donate/Edit';
import Donation from '../pages/Donation';
import Slider from './Slider';

function Router() {
    const user = useSelector((store: RootState) => store.user!.user);
    const dispatch = useDispatch();

    return (
        <BrowserRouter>
            <Menu />
            <div className="md:mt-0 mx-auto">
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/news"} element={<News />} />
                    <Route path={"/downloads"} element={<Downloads />} />
                    <Route path={"/donate"} element={<Donate />} />
                    <Route path={"/rules"} element={<Rules />} />
                    <Route path={"/game"} element={<Game />} />
                    <Route path={"/droplist"} element={<Droplist />} />
                    <Route path={"/news/:slug"} element={<SingleNews />} />
                    <Route path={"/history"} element={<History />} />
                    <Route path={"/interface"} element={<Interface />} />
                    <Route path={"/contact"} element={<Contact />} />
                    <Route path={"/faq"} element={<Faq />} />
                    {localStorage.getItem('token') ? (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/guildmark" element={<Guildmark />} />
                            <Route path="/donation" element={<Donation />} />
                            {user!.access_level === 'Admin' && (
                                <>
                                    <Route path="/admin/news" element={<AdminNews />} />
                                    <Route path="/admin/news/edit/:slug" element={<AdminEditNews />} />
                                    <Route path="/admin/donate" element={<DonateAdmin />} />
                                    <Route path="/admin/donate/edit/:slug" element={<AdminEditPackage />} />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/recovery-password" element={<Recovery />} />
                        </>
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Router;
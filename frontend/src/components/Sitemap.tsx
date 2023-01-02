import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

function AnyElement() {
    return <div>Any Element</div>;
}

function Router() {
    return (
            <Routes>
                <Route path="/" element={<AnyElement />} />
                <Route path="/news" element={<AnyElement />} />
                <Route path="/downloads" element={<AnyElement />} />
                <Route path="/donate" element={<AnyElement />} />
                <Route path="/rules" element={<AnyElement />} />
                <Route path="/game" element={<AnyElement />} />
                <Route path="/droplist" element={<AnyElement />} />
                <Route path="/news/:slug" element={<AnyElement />} />
                <Route path="/history" element={<AnyElement />} />
                <Route path="/interface" element={<AnyElement />} />
                <Route path="/contact" element={<AnyElement />} />
                <Route path="/faq" element={<AnyElement />} />
                <Route path="/profile" element={<AnyElement />} />
                <Route path="/guildmark" element={<AnyElement />} />
                <Route path="/donation" element={<AnyElement />} />
                <Route path="/sign-in" element={<AnyElement />} />
                <Route path="/sign-up" element={<AnyElement />} />
                <Route path="/recovery-password" element={<AnyElement />} />
            </Routes>
    );
}

export default Router;
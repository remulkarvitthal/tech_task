import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './client/Search';
import Client from './client/Client';
import Faviorte from './client/Faviorte';
import PropertyDetail from './client/PropertyDetail';
import CreateProperty from './agent/CreateProperty';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Properties" element={<Search />} />
                <Route path="/Favorites" element={<Faviorte />} />
                <Route path="/about" element={<Client />} />
                <Route path="/PropertyDetail/:id" element={<PropertyDetail />} />
                <Route path="/" element={<Client />} />
                <Route path="/agent" element={<CreateProperty />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
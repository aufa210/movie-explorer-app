import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Detail } from '@/pages/Detail';
import { Favorite } from '@/pages/Favorite';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/favorite' element={<Favorite />} />
    </Routes>
  );
}

export default App;

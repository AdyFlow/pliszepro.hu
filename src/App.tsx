import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Impresszum from './pages/Impresszum';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/impresszum" element={<Impresszum />} />
    </Routes>
  );
}
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Teams from './pages/Teams';
import Tasks from './pages/Tasks';

import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Kisa palvelu</h1>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/tasks" element={<Tasks />} />
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;

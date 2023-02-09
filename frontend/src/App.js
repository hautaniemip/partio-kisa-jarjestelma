import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Teams from './pages/Teams';
import Tasks from './pages/Tasks';

import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<header>
					<h1>Kisa palvelu</h1>
					<Navbar />
				</header>
				<div className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/teams" element={<Teams />} />
						<Route path="/tasks/*" element={<Tasks />} />
					</Routes>
				</div>
				<footer></footer>
			</BrowserRouter>
		</div>
  );
}

export default App;

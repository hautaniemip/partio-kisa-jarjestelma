import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Alert, { AlertContainer } from './components/Alert';

import Home from './pages/Home';
import Teams from './pages/Teams';
import Tasks from './pages/Tasks';

import './App.css';

function App() {
	const [alerts, setAlerts] = useState([{type: "error", message: "Test"}, {type: "success", message: "Test"}]);

	const closeAlert = (index) => {
		let data = [...alerts]
		data.splice(index, 1)
		setAlerts(data);
	}

	return (
		<div className="App">
			<BrowserRouter>
				<header>
					<h1>Kisa palvelu</h1>
					<Navbar />
				</header>
				
				<div className="main-content">
					<AlertContainer>
						{alerts.map((alert, index) => {
							return <Alert key={index} type={alert.type} message={alert.message} index={index} closeCallback={closeAlert} />
						})}
					</AlertContainer>

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

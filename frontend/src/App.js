import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Alert, { AlertContainer } from './components/Alert';

import Home from './pages/Home';
import Teams from './pages/Teams';
import Tasks from './pages/Tasks';

import './App.css';

function App() {
	const [alerts, setAlerts] = useState([]);
	const [connected, setConnected] = useState(false);

	const alertsRef = useRef([]);
	const connectedRef = useRef(false);

	useEffect(() => {
		alertsRef.current = alerts;
		connectedRef.current = connected;
	})

	useEffect(() => {
		const ping = () => {
			fetch("/api/ping")
				.then((res) => {
					return res.text();
				})
				.then((data) => {
					if (data === "OK") {
						if (connectedRef.current)
							return;
						setAlerts(() => {
							let newAlerts = alertsRef.current;
							return newAlerts.concat([{type: "success", message: "Connection established"}]);
						});
						setConnected(true);
					}
					else {
						if (!connectedRef.current)
							return;
						setAlerts(() => {
							let newAlerts = alertsRef.current;
							return newAlerts.concat([{type: "error", message: data}]);
						});
						setConnected(false);
					}
				})
		}
		ping();

		const timer = setInterval(() => {ping()}, 15000);

		return () => clearInterval(timer);
	}, []);

	const closeAlert = (index) => {
		let data = [...alerts];
		data.splice(index, 1);
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
						{alerts && alerts.map((alert, index) => {
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

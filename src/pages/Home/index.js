import React, { useState, useEffect, useMemo } from 'react';

import Table from '../../components/Table';
import LoadingSpinner from '../../components/LoadingSpinner';

const Home = () => {
	const [tasks, setTasks] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [results, setResults] = useState(null);

	useEffect(() => {
		let getTasks = () => {
			fetch("/api/tasks")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setTasks(data);
					setError(null);
				})
				.catch((err) => {
					setTasks(null);
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getTasks()
	}, []);

	useEffect(() => {
		let getResults = () => {
			fetch("/api/results")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setResults(data);
					setError(null);
				})
				.catch((err) => {
					setResults(null);
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getResults()
	}, []);

	const makeColumns = () => {
		if (!tasks)
			return [];

		let columns = [{ Header: "Joukkue", accessor: "team.name"}]
		tasks.forEach((task) => {
			let name = task.name;
			let id = "team." + task.id.toString();
			columns.push({ Header: name, accessor: id });
		});

		columns.push({Header: "Total", accessor: "team.total"})

		return columns;
	}

	const columns = useMemo(
		() => makeColumns(),
		[tasks]
	);

	const data = [
		{
			team: "Test",
			1: 100
		}
	];

	return (
		<>
			<h2>Home</h2>
			<br />
			<h3>Tulokset</h3>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{tasks && results && <Table columns={columns} data={results} />}
			<h3>Rastit</h3>
		</>
	);
};

export default Home;

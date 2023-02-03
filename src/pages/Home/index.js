import React, { useState, useEffect, useMemo } from 'react';
import ResultTable from '../../components/ResultTable';

const Home = () => {
	const [tasks, setTasks] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	const makeColumns = () => {
		if (!tasks)
			return [];

		let columns = [{ Header: "Joukkue", accessor: "team"}]
		tasks.forEach((task) => {
			let name = task.name;
			let id = task.id.toString();
			columns.push({ Header: name, accessor: id });
		});

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
			<h3>Joukkueet</h3>
			<ResultTable columns={columns} data={data} />
			<h3>Rastit</h3>
		</>
	);
};

export default Home;

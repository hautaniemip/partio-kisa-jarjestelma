import React, { useState, useEffect, useMemo } from 'react';

import Table from './../Table';
import LoadingSpinner from './../LoadingSpinner';

const TaskView = ({task}) => {
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let getResults = () => {
			fetch(`/api/results/${task.id}`)
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
	}, [task.id]);

	const columns = useMemo(
		() => [
			{
				Header: "Joukkue",
				accessor: "team.name"
			},
			{
				Header: "Pisteet",
				accessor: "team." + task.id.toString()
			}
		],
		[task.id]
	);
	return (
		<div>
			<h3>{task.name}</h3>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{results && <Table columns={columns} data={results} />}
		</div>
	);
}

export default TaskView;
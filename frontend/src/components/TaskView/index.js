import React, { useState, useEffect, useMemo } from 'react';

import Table from './../Table';
import LoadingSpinner from './../LoadingSpinner';

const TaskView = ({task}) => {
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [teamId, setTeamId] = useState(1)

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

	const handleChange = (event) => {
		setTeamId(event.target.value);
	}

	const markTeam = () => {
		console.log("Team " + teamId + " arrived");
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({teamId: teamId, taskId: task.id})
		};
		// TODO: Validate form inputs before sending:
		// - no same id
		fetch("/api/team/change-task", requestOptions)
		.catch((err) => {
			console.log(err);
		})
	}
	return (
		<div>
			<h3>{task.name}</h3>
			<div>
				<input
					type="number"
					name="id"
					value={teamId}
					onChange={ event => handleChange(event) }
				/>
				<button type="button" onClick={ markTeam }>Merkitse joukkue saapuneeksi</button>
			</div>
			<h4>Tulokset</h4>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{results && <Table columns={columns} data={results} />}
		</div>
	);
}

export default TaskView;
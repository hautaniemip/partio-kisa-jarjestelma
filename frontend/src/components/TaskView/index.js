import React, { useState, useEffect, useMemo } from 'react';

import Table from './../Table';
import LoadingSpinner from './../LoadingSpinner';

const TaskView = ({task}) => {
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [teamId, setTeamId] = useState(1);
	const [teamPoints, setTeamPoints] = useState(100);
	const [refresh, setRefresh] = useState(false);

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

		getResults();
		setRefresh(false);
	}, [task.id, refresh]);

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

	const handlePointsChange = (event) => {
		setTeamPoints(event.target.value);
	}

	const markTeam = () => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({teamId: teamId, taskId: task.id})
		};
		// TODO: Validate form inputs before sending:
		fetch("/api/team/change-task", requestOptions)
		.catch((err) => {
			console.log(err);
		});
	}

	const sendPoints = () => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({teamId: teamId, taskId: task.id, points: teamPoints})
		};
		// TODO: Validate form inputs before sending:
		fetch("/api/results", requestOptions)
		.catch((err) => {
			console.log(err);
		});
		setRefresh(true);
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
				<button type="button" onClick={markTeam}>Merkitse joukkue saapuneeksi</button>
			</div>
			<div>
				<input
					type="number"
					name="id"
					value={teamId}
					onChange={ event => handleChange(event) }
				/>
				<input
					type="number"
					name="id"
					value={teamPoints}
					onChange={ event => handlePointsChange(event) }
				/>
				<button type="button" onClick={sendPoints}>Tallenna</button>
			</div>
			<h4>Tulokset</h4>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{results && <Table columns={columns} data={results} />}
		</div>
	);
}

export default TaskView;
import { useState, useEffect, useMemo } from 'react';

import Table from '../../components/Table';
import LoadingSpinner from '../../components/LoadingSpinner';

const TaskInfoTable = () => {
	const [teams, setTeams] = useState(null);
	const [tasks, setTasks] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let getTeams = () => {
			fetch("/api/teams")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setTeams(data);
					setError(null);
				})
				.catch((err) => {
					setTeams(null);
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getTeams()
	}, []);

	useEffect(() => {
		let getTasks = () => {
			fetch("/api/tasks")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					let result = [];
					for (let task of data) {
						let teamCount = 0;
						for (let team of teams) {
							if (team.TaskId == task.id)
								teamCount++;
						}
						task["teamCount"] = teamCount;
						result.push(task)
					}
					setTasks(result);
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
	}, [teams]);

	const columns = useMemo(() =>
		[{
			Header: "ID",
			accessor: "id"
		},
		{
			Header: "Rasti",
			accessor: "name"
		},
		{
			Header: "Joukkueita",
			accessor: "teamCount"
		}],
		[]
	);

	return (
		<>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{tasks && <Table columns={columns} data={tasks} />}
		</>
	);
}

export default TaskInfoTable;
import { useState, useEffect, useMemo } from 'react';

import Table from '../../components/Table';
import LoadingSpinner from '../../components/LoadingSpinner';

const TeamInfoTable = ({ refresh }) => {
	const [teams, setTeams] = useState(null);
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
	}, [refresh]);

	const columns = useMemo(() =>
		[{
			Header: "ID",
			accessor: "id"
		},
		{
			Header: "Joukkue",
			accessor: "name"
		},
		{
			Header: "Rasti",
			accessor: "TaskId"
		}],
		[]
	);

	return (
		<>
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			{teams && <Table columns={columns} data={teams} />}
		</>
	);
}

export default TeamInfoTable;
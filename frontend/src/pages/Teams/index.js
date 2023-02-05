import { useState, useEffect } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ManagerForm from '../../components/ManagerForm';

const Teams = () => {
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
	}, []);


	return (
		<div>
			<h2>Teams</h2>
			<ManagerForm header="Hallitse joukkueita" apiPath="/api/teams" />
		</div>
	);
};

export default Teams;

import { useState, useEffect } from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';

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
			{error && (<span>{error}</span>)}
			{loading && (<LoadingSpinner />)}
			<ul>
				{teams && teams.map((data) => {
					return (
						<li key={data.id}>
							<span>{data.id} {data.name}</span>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Teams;

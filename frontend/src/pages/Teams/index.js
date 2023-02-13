import { useState, useEffect } from 'react';

import TeamInfoTable from '../../components/TeamInfoTable';
import ManagerForm from '../../components/ManagerForm';

const Teams = () => {
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setRefresh(false);
	}, [refresh]);

	return (
		<div>
			<h2>Joukkueet</h2>
			<TeamInfoTable refresh={refresh} />
			<ManagerForm header="Hallitse joukkueita" apiPath="/api/teams" refresh={setRefresh} />
		</div>
	);
};

export default Teams;

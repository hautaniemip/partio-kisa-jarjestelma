import TeamInfoTable from '../../components/TeamInfoTable';
import ManagerForm from '../../components/ManagerForm';

const Teams = () => {
	return (
		<div>
			<h2>Joukkueet</h2>
			<TeamInfoTable />
			<ManagerForm header="Hallitse joukkueita" apiPath="/api/teams" />
		</div>
	);
};

export default Teams;

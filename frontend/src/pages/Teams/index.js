import ManagerForm from '../../components/ManagerForm';

const Teams = () => {
	return (
		<div>
			<h2>Teams</h2>
			<ManagerForm header="Hallitse joukkueita" apiPath="/api/teams" />
		</div>
	);
};

export default Teams;

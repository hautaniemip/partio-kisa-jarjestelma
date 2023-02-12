import ResultsTable from '../../components/ResultTable';
import TeamInfoTable from '../../components/TeamInfoTable';
import TaskInfoTable from '../../components/TaskInfoTable';

const Home = () => {
	return (
		<>
			<h2>Yhteenveto</h2>
			<br />
			<h3>Tulokset</h3>
			<ResultsTable />
			<h3>Joukkueet</h3>
			<TeamInfoTable />
			<h3>Rastit</h3>
			<TaskInfoTable />
		</>
	);
};

export default Home;

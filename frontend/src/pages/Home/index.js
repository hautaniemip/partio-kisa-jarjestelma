import ResultsTable from '../../components/ResultTable';
import TeamInfoTable from '../../components/TeamInfoTable';
import TaskInfoTable from '../../components/TaskInfoTable';

const Home = () => {
	return (
		<>
			<h2>Yhteenveto</h2>
			<br />
			<div className="element-container">
				<h3>Tulokset</h3>
				<ResultsTable />
			</div>
			<div className="element-container">
				<h3>Joukkueet</h3>
				<TeamInfoTable />
			</div>
			<div className="element-container">
				<h3>Rastit</h3>
				<TaskInfoTable />
			</div>
		</>
	);
};

export default Home;

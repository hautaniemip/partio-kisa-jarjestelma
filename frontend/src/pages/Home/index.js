import ResultsTable from '../../components/ResultTable';
import TeamInfoTable from '../../components/TeamInfoTable';

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
		</>
	);
};

export default Home;

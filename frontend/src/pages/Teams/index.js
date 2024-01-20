import {useState, useEffect} from 'react';

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
            <div className="element-container">
                <TeamInfoTable refresh={refresh}/>
            </div>
            <div className="element-container">
                <ManagerForm header="Hallitse joukkueita" apiPath="/api/teams" reloadParent={setRefresh}/>
            </div>
        </div>
    );
};

export default Teams;

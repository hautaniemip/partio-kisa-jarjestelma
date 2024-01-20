import React, {useState, useEffect, useMemo} from 'react';

import Table from './../Table';
import LoadingSpinner from './../LoadingSpinner';
import TaskInfoTable from './../TaskInfoTable';

const TaskView = ({task}) => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [teamId, setTeamId] = useState(100);
    const [teamPoints, setTeamPoints] = useState(0);
    const [teamTime, setTeamTime] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let getResults = () => {
            fetch(`/api/results/${task.id}`)
                .then((res) => {
                    if (!res.ok)
                        throw new Error(`HTTP error: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setResults(data);
                    setError(null);
                })
                .catch((err) => {
                    setResults(null);
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        getResults();
        setRefresh(false);
    }, [task.id, refresh]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "team.id"
            },
            {
                Header: "Joukkue",
                accessor: "team.name"
            },
            {
                Header: "Pisteet",
                accessor: "team." + task.id.toString()
            },
            {
                Header: "Aika",
                accessor: "team.times." + task.id.toString()
            }
        ],
        [task.id]
    );

    const handleChange = (event) => {
        setTeamId(event.target.value);
    }

    const handlePointsChange = (event) => {
        setTeamPoints(event.target.value);
    }

    const handleTimeChange = (event) => {
        setTeamTime(event.target.value);
    }

    const markTeam = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({teamId: +teamId, taskId: task.id})
        };
        // TODO: Validate form inputs before sending:
        fetch("/api/team/change-task", requestOptions)
            .catch((err) => {
                console.log(err);
            });
        setRefresh(true);
    }

    const sendPoints = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({teamId: teamId, taskId: task.id, points: teamPoints, time: teamTime || null})
        };
        // TODO: Validate form inputs before sending:
        fetch("/api/results", requestOptions)
            .catch((err) => {
                console.log(err);
            });
        setRefresh(true);
    }

    return (
        <div>
            <h3>{task.name}</h3>
            <div className="element-container">
                <div className="flex-column">
                    <input
                        type="number"
                        name="id"
                        value={teamId}
                        onChange={event => handleChange(event)}
                    />
                    <button type="button" onClick={markTeam}>Merkitse joukkue saapuneeksi</button>
                </div>

                <div className="flex-column">
                    <label>Joukkue</label>
                    <input
                        type="number"
                        name="id"
                        value={teamId}
                        onChange={event => handleChange(event)}
                    />
                    <label>Pisteet</label>
                    <input
                        type="number"
                        name="points"
                        value={teamPoints}
                        onChange={event => handlePointsChange(event)}
                    />
                    <label>Aika</label>
                    <input
                        type="text"
                        name="time"
                        value={teamTime}
                        onChange={event => handleTimeChange(event)}
                    />
                    <button type="button" onClick={sendPoints}>Tallenna</button>
                </div>

            </div>
            <div className="element-container">
                <h3>Tulokset</h3>
                {error && (<span>{error}</span>)}
                {loading && (<LoadingSpinner/>)}
                {results && <Table columns={columns} data={results}/>}
            </div>

            <div className="element-container">
                <h3>Rastit</h3>
                <TaskInfoTable refresh={refresh}/>
            </div>
        </div>
    );
}

export default TaskView;

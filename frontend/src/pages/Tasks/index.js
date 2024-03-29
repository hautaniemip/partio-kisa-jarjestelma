import {useState, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import TaskBar from './../../components/TaskBar';
import TaskView from './../../components/TaskView';
import ManagerForm from './../../components/ManagerForm';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let getTasks = () => {
            fetch("/api/task")
                .then((res) => {
                    if (!res.ok)
                        throw new Error(`Failed loading Tasks:\nHTTP error: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setTasks(data);
                })
                .catch((err) => {
                    setTasks(null);
                    console.log(err);
                });
        };

        getTasks();
        setRefresh(false);
    }, [refresh]);


    return (
        <>
            <h2>Rastit</h2>
            <TaskBar tasks={tasks}/>
            <Routes>
                {tasks && tasks.map((task) => {
                    return (
                        <Route key={task.id} path={`task-${task.id}`} element={<TaskView task={task}/>}/>
                    )
                })}
                <Route path="/manage" element={
                    <div className="element-container">
                        <ManagerForm header="Hallitse rasteja" apiPath="/api/task" reloadParent={setRefresh}/>
                    </div>
                }/>
                <Route path="/" element={<Navigate to="task-1"/>}/>
            </Routes>
        </>
    );
}

export default Tasks;
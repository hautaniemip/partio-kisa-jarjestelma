import { useState, useEffect } from 'react';

import './AddTaskForm.css';

const AddTaskForm = () => {
	const [inputFields, setInputFields] = useState([{ id: 100, name: '' }])
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let getTasks = () => {
			fetch("/api/tasks")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setInputFields(data);
					setError(null);
				})
				.catch((err) => {
					setInputFields(null);
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getTasks()
	}, []);

	const handleFormChange = (index, event) => {
		let data = [...inputFields];
		if (event.target.name === "id")
			data[index][event.target.name] = parseInt(event.target.value);
		else
			data[index][event.target.name] = event.target.value;
		setInputFields(data);
	}

	const addField = () => {
		const newField = { id: 1, name: '' }
		setInputFields([...inputFields, newField])
	}

	const removeField = (index) => {
		let data = [...inputFields];
    	data.splice(index, 1);
    	setInputFields(data);
	}

	const save = (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(inputFields)
		};
		// TODO: Validate form inputs before sending:
		// - no same id
		fetch("/api/tasks", requestOptions)
		.catch((err) => {
			console.log(err);
		})
		.finally(() => window.location.reload(false));
	}

	return (
		<div>
			<h3>Add Task</h3>
			<form onSubmit={e => e.preventDefault()} className="add-task">
				<div className="form-header form-row">
					<div>Numero</div>
					<div>Joukkue</div>
				</div>
				{inputFields && inputFields.map((input, index) => {
					return (
						<div key={index} className="form-row">
							<input
								type="number"
								name="id"
								placholder="Number"
								value={input.id}
								onChange={event => handleFormChange(index, event)}
							/>
							<input
								name="name"
								placholder="Name"
								value={input.name}
								onChange={event => handleFormChange(index, event)}
							/>
							{/* FIXME: Pressing enter in input deletes the row */}
							<button onClick={() => removeField(index)}>X</button>
						</div>
					)
				})}
			</form>
			<button onClick={addField}>Add More...</button>
			<button onClick={save}>Save</button>
		</div>
	);
}

export default AddTaskForm;
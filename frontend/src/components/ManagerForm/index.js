import {useState, useEffect} from 'react';

import './ManagerForm.css';

const ManagerForm = ({header, apiPath, reloadParent}) => {
    const [inputFields, setInputFields] = useState([{id: 1, name: ''}]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        let getFromAPI = () => {
            fetch(apiPath)
                .then((res) => {
                    if (!res.ok)
                        throw new Error(`HTTP error: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    setInputFields(data);
                })
                .catch((err) => {
                    console.log(err)
                });
        };

        getFromAPI();
        setRefresh(false);
    }, [apiPath, refresh]);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (event.target.name === "id")
            data[index][event.target.name] = parseInt(event.target.value);
        else
            data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addField = () => {
        const newField = {id: 1, name: ''}
        setInputFields([...inputFields, newField])
    }

    const removeField = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    }

    const save = (event) => {
        event.preventDefault();
        if (validateFiels()) {
            alert("Kaksi tai useampi kenttä sisältää saman numeron");
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputFields)
        };

        fetch(apiPath, requestOptions)
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                if (reloadParent)
                    reloadParent(true);
                else
                    window.location.reload(false);
            });
    }

    const cancel = (event) => {
        event.preventDefault();
        setRefresh(true);
    }

    const validateFiels = () => {
        let hash = Object.create(null);
        return inputFields.some((arr) => {
            return arr["id"] && (hash[arr["id"]] || !(hash[arr["id"]] = true));
        });
    }

    return (
        <div className="manager">
            <h3>{header}</h3>
            <form onSubmit={event => event.preventDefault()} className="manager">
                <div className="form-header form-row">
                    <div>Numero</div>
                    <div>Nimi</div>
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
                            <button className="btn remove-btn" type="button"
                                    onClick={() => removeField(index)}>&times;</button>
                        </div>
                    )
                })}
                <button className="btn add-btn" type="button" onClick={addField}>Lisää...</button>
                <button className="btn save-btn" type="button" onClick={save}>Tallenna</button>
                <button className="btn cancel-btn" type="button" onClick={cancel}>Peruuta</button>
            </form>
        </div>
    );
}

export default ManagerForm;
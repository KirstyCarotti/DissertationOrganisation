import React, {useState} from 'react'
import {
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import './List.css';
import { FaEdit } from 'react-icons/fa';

const ListItem = (props) => {
    const { id,listId, title, description, state} = props; 

    const [isChecked, setIsChecked] = useState(state === 0 ? true:false);

    function handleChange(e) {
        var newState; 
        if (isChecked) {
            newState = 1;
        } else {
            newState = 0;
        }
        fetch('https://localhost:44388/api/listItems/' + id,
            {
                method: "Put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id, 
                    listId: listId, 
                    title: title, 
                    description: description,
                    listSubItems: null, 
                    state: newState
                }),
            })
            .then(setIsChecked(!isChecked))
            .catch(e => console.log(e));

    }
        return (
            <div>
                <FormGroup check>
                    <Input type="checkbox" checked={isChecked} onChange={handleChange} id={id} />
                    <Label>
                        {title}
                    </Label>
                    <FaEdit />
                </FormGroup> 
            </div>
        )
    
}
export default ListItem
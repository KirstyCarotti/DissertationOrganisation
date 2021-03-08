import React, {useState} from 'react'
import {
    FormGroup,
    Input,
    Label,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    ModalFooter,
    Button 
} from 'reactstrap';
import './List.css';
import { FaEdit } from 'react-icons/fa';

const ListItem = (props) => {
    const { id, listId, title, description, state, needUpdate, currentUpdate} = props; 

    const [isChecked, setIsChecked] = useState(state === 0 ? true:false);
    const [modal, setModal] = useState(false);
    const [newTitle, setTitle] = useState(title);
    const [newDescription, setDescription] = useState(description);

    const toggle = () => setModal(!modal);



    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name == "title") {
            setTitle(value);
        }
        else if (name == "description") {
            setDescription(value);
        }

    }

    function handleChange(e) {
        var newState = state;
        if (e.target.name == "complete") {
            if (isChecked) {
                newState = 1;
            } else {
                newState = 0;
            }
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
                    title: newTitle,
                    description: newDescription,
                    listSubItems: null,
                    state: newState
                }),
            })
            .then(setIsChecked(newState === 0 ? true : false))
            //Needs to be toggles 
            .then(needUpdate(!currentUpdate))
            .catch(e => console.log(e));

    }
        return (
            <div>
                <FormGroup check>
                    <Row>
                        <Input type="checkbox" name="complete" checked={isChecked} onChange={handleChange} id={id} />
                        <div onClick={toggle}>
                            <Label>
                            {title}
                            <span className= "editButton">
                                <FaEdit className="editButton" />
                            </span>
                        </Label> 
                        </div>
                    </Row>
                </FormGroup> 
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" name="title" id="title" onChange={handleInputChange} defaultValue={title} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" defaultValue={description} onChange={handleInputChange} id="exampleText" />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={handleChange} >Save</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    
}
export default ListItem
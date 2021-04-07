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
    Button,
} from 'reactstrap';
import './List.css';
import { FaEdit} from 'react-icons/fa';

const ListItem = (props) => {
    const { id, listId, title, description, state, needUpdate,currentUpdate} = props; 

    const [isChecked, setIsChecked] = useState(state === 0 ? true:false);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [newTitle, setTitle] = useState(title);
    const [newDescription, setDescription] = useState(description);
    const toggle = () => setModal(!modal);
    const deleteToggle = () => setDeleteModal(!deleteModal);

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
        setModal(false)
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
            .then(needUpdate(!currentUpdate))
            .catch(e => console.log(e));

        needUpdate(!currentUpdate)
    }

    function deleteListItem(e) {
        toggle();
        deleteToggle();
        fetch('https://localhost:44388/api/listItems/' + id,
            {
                method: "Delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(needUpdate(!currentUpdate))
            .catch(e => console.log(e));

        needUpdate(!currentUpdate)

    }
    return (
            <div>
                <FormGroup check>
                    <Row>
                        <Input type="checkbox" name="complete" checked={isChecked} onChange={handleChange} id={id} />
                            <Label>
                                {title}
                            <span onClick={toggle} className= "editButton">
                                <FaEdit className="editButton" />
                            </span>
                        </Label> 
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
                            <Button color="success" onClick={handleChange}>Save</Button>{' '}
                            <Button color="danger" onClick={deleteToggle}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                <Modal isOpen={deleteModal} toggle={deleteToggle}>
                    <ModalHeader toggle={deleteToggle}>Delete {title}</ModalHeader>
                    <ModalBody>
                        <div>
                            <p> Are you sure you want to delete {title}? You will not be able to recover it once deleted. </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={deleteListItem}>Delete</Button>
                        <Button color="secondary" onClick={deleteToggle} >Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
                </div>
            </div>
        )
    
}
export default ListItem
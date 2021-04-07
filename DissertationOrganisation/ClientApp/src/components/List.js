import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import ListItem from './ListItem.js';
import './List.css';


const List = (props) => {
    const { id, name, items, needUpdate, currentUpdate, currentDate} = props;

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [titleValid, setTitleValid] = useState(false);
    const [description, setDescription] = useState("");


    useEffect(() => { validate() }, [title]);

    function toggle(){
        setModal(!modal);
        setTitle("");
        setDescription("")
        setTitleValid(false)
    }

    function handleInputChange(event){
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

    function validate() {
        if (title.length <=0) {
            setTitleValid(false)
        } else {
            setTitleValid(true)
        }
    }

    function addItem(e) {
        validate();
        if (titleValid) {
            fetch('https://localhost:44388/api/listItems/',
                {
                    method: "Post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        listId: id,
                        title: title,
                        description: description,
                        date: currentDate
                    }),
                })
                .then(needUpdate(!currentUpdate))
                .then(toggle())
                .catch(e => console.log(e));
        }
        
    }


        return (
            <div>
                        <Card id={id} className="listContainer">
                            <CardTitle className="listTitle">{name}</CardTitle>
                                <div onClick={toggle} className="addButton">
                                    <FaRegPlusSquare className="addButton" />
                                </div>
                            <CardBody className="list">
                                {items.map(item =>
                                    <ListItem key={item.id} id={item.id} listId={item.listId} title={item.title} description={item.description} state={item.state} needUpdate={needUpdate} currentUpdate={currentUpdate} />
                                    )}
                            </CardBody>
                        </Card>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add Item</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input invalid={!titleValid} type="text" name="title" id="title" onChange={handleInputChange} placeholder="Item name" />
                                    {!titleValid && < FormFeedback >Title cannot be empty</FormFeedback>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" id="exampleText" onChange={handleInputChange} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={addItem}>Save</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )

}
export default List
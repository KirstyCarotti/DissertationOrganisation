import React, { useState } from 'react'
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
    Alert
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import ListItem from './ListItem.js';
import './List.css';


const List = (props) => {
    const { id, name, items, needUpdate, currentUpdate, currentDate} = props;

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    function toggle(){
        setModal(!modal);
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

    function addItem(e) {
        toggle();
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
            .catch(e => console.log(e));

        
    }


    

        return (
            <div>
                <Row>
                    <Col sm="6">
                        <Card id={id} >
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
                    </Col>
                </Row>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add Item</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" name="title" id="title" onChange={handleInputChange} placeholder="Item name" />
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
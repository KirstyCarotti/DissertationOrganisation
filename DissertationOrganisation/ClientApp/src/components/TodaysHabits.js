import React, { useEffect, useState } from 'react'
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
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import './Habit.css';

const TodaysHabits = (props) => {

    const [update, setUpdate] = useState(false);
    const [todaysHabits, setTodaysHabits] = useState([]);
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    function toggle() {
        setModal(!modal);
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name == "name") {
            setName(value);
        }
        else if (name == "description") {
            setDescription(value);
        }

    }

    useEffect(() => {
        fetch('https://localhost:44388/api/todaysHabits/',
            {
                method: "Get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setTodaysHabits(response);
                setSuccess(true);
            })
            .catch(e => console.log(e));



    }, [])

    function addItem(e) {
        toggle();
        fetch('https://localhost:44388/api/todaysHabits/',
            {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: null,
                    name: name,
                    description: description,
                   // date: currentDate
                }),
            })
            .then(setUpdate(!update))
            .catch(e => console.log(e));


    }

    console.log(todaysHabits)

    if (success) {
        return (
            <div>
            <div className="todaysHabits">
                <Card className="todaysHabits"/*id={/*id}*/ >
                    <CardTitle className="listTitle">Todays Habits</CardTitle>
                    <div onClick={toggle} className="addButton">
                        <FaRegPlusSquare className="addButton" />
                    </div>
                    <CardBody>
                        {todaysHabits.map(habit =>
                          //  <ListItem key={item.id} id={item.id} listId={item.listId} title={item.title} description={item.description} state={item.state} needUpdate={needUpdate} currentUpdate={currentUpdate} />
                        console.log(habit)
                            )}
                    </CardBody>
                </Card>
            </div>
             <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add Habit</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="text" name="name" id="name" onChange={handleInputChange} placeholder="Item name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" id="exampleText" onChange={handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                <Label>Start Date</Label>
                                    <Input
                                        className="date"
                                        type="date"
                                        name="startDate"
                                        id="exampleDate"
                                    />
                                <Label>End Date</Label>
                                    <Input
                                        className="date"
                                        type="date"
                                        name="endDate"
                                        id="exampleDate"
                                        />
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
    return (<p> loading </p>)


}
export default TodaysHabits
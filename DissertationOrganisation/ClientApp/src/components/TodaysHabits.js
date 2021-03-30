//info on colout picker https://casesandberg.github.io/react-color/


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
    Badge,
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import RepeatSelect from './RepeatSelect.js';
import RepeatDays from './RepeatDays.js';
import TodaysHabit from './TodaysHabit.js';
import './Habit.css';
import { HexColorPicker } from "react-colorful";

const TodaysHabits = (props) => {
    const { update, setUpdate } = props;
    const [todaysHabits, setTodaysHabits] = useState([]);
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [repeat, setRepeat] = useState("");
    const [repeatDays, setRepeatDays] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
  //  const [displayColourPicker, setDisplayColourPicker] = useState(false)
    const [colour, setColour] = useState("#207bd7");
    const [isMeasurable, setIsMeasurable] = useState(false);


    function handleChange(colour, event) {
        setColour(colour.hex);
    };

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
        else if (name == "measurable") {
            setIsMeasurable(!isMeasurable)
        }
        else if (name == "startDate") {
            setStartDate(value)
        }
        else if (name == "endDate") {
            setEndDate(value)
        }
        else if (name == "colour")
        {
            setColour(value);
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

    }, [update])

    function addItem(e) {
        toggle();
        fetch('https://localhost:44388/api/habits/',
            {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: 0,
                    name: name,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    repeat: repeat,
                    repeatDays: repeatDays,
                    colour: colour,
                    measurable: isMeasurable
                }),
            })
            .then(setUpdate(!update))
            .catch(e => console.log(e));


    }

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
                                <TodaysHabit key={habit.id} id={habit.id} name={habit.name} isComplete={habit.isComplete} />
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
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" id="exampleText" onChange={handleInputChange} />
                                    <div className="habitDate">
                                        <Label>Start Date</Label>
                                        <Input
                                            className="date"
                                            type="date"
                                            name="startDate"
                                            id="exampleDate"
                                            onChange={handleInputChange}
                                            />
                                    </div>
                                        <div className="endDate">
                                            <Label>End Date</Label>
                                            <Input
                                                className="date"
                                                type="date"
                                                name="endDate"
                                            id="exampleDate"
                                            onChange={handleInputChange}
                                                />
                                    </div>
                                    <Row>
                                        <Col>
                                    <div className ="repeat">
                                        <Label>Repeat</Label>
                                        <RepeatSelect repeat={repeat} setRepeat={setRepeat} setIsVisible={setIsVisible} />
                                    </div>
                                  
                                    <div>
                                        <div /*HexColorPicker color={colour} onChange={handleChange} */ />
                                                <Label>Colour </Label>
                                                <Input type="text" name="colour" id="colour" onChange={handleInputChange} defaultValue={colour} />
                                    </div>
                                    <div className="measurable">
                                        <Input type="checkbox" name="measurable" checked={isMeasurable} onChange={handleInputChange} />
                                    <span>Is Measurable</span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="weekly">
                                                <RepeatDays isVisible={isVisible} repeatDays={repeatDays} setRepeatDays={setRepeatDays} />
                                            </div>
                                            </Col>
                                    </Row>
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
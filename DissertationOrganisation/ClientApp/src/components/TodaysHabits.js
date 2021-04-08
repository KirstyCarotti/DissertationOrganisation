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
    FormFeedback
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import RepeatSelect from './RepeatSelect.js';
import RepeatDays from './RepeatDays.js';
import TodaysHabit from './TodaysHabit.js';
import './Habit.css';
import { HexColorPicker } from "react-colorful";

const TodaysHabits = (props) => {
    const { currentUpdate, needUpdate } = props;
    const [todaysHabits, setTodaysHabits] = useState([]);
    const [success, setSuccess] = useState(false);
    const [modal, setModal] = useState(false);

    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [startDateValid, setStartDateValid] = useState(false);

    const [endDate, setEndDate] = useState(null);
    const [endDateValid, setEndDateValid] = useState(false);

    const [repeat, setRepeat] = useState(null);
    const [repeatDays, setRepeatDays] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
  //  const [displayColourPicker, setDisplayColourPicker] = useState(false)

    const [colour, setColour] = useState("#207bd7");
    const [colourValid, setColourValid] = useState(false);

    const [isMeasurable, setIsMeasurable] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [colourModal, setColourModal] = useState(false);
    function colourToggle() {
        setColourModal(!colourModal)
    }

    function handleChange(colour, event) {
        setColour(colour.hex);
    };

    function toggle() {
        setModal(!modal);
        isVisible ? setIsVisible(!isVisible) : setIsVisible(false); 
        setColour("#207bd7");
        setIsMeasurable(false);
        setRepeatDays([]);
        setRepeat(null);
        setEndDate(null);
        setStartDate(null);
        setDescription("");
        setName("");
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
        validate()


    }
    function validate() {

        if (name.length <= 0) {
            setNameValid(false)
        } else {
            setNameValid(true)
        }

        if (startDate == null) {
            setStartDateValid(false);
        } else {
            setStartDateValid(true)
        }

        if (endDate == null) {
            setEndDateValid(true);
        } else {
            if (startDate != null) {
                var startSplit = startDate.split('-');
                var endSplit = endDate.split('-');
                if (parseInt(startSplit[0]) < parseInt(endSplit[0])) {
                    setEndDateValid(true)
                } else if (parseInt(startSplit[0]) === parseInt(endSplit[0])) {
                    if (parseInt(startSplit[1]) < parseInt(endSplit[1])) {
                        setEndDateValid(true)
                    } else if (parseInt(startSplit[1]) === parseInt(endSplit[1])) {
                        if (parseInt(startSplit[2]) <= parseInt(endSplit[2])) {
                            setEndDateValid(true)
                        } else {
                            setEndDateValid(false)
                        }
                    } else {
                        setEndDateValid(false)
                    }
                } else {
                    setEndDateValid(false)
                }
            } else {
                setEndDateValid(false)
            }
        }

        if (colour.length === 7 && colour.split("")[0] === '#') {
            setColourValid(true)
        } else {
            setColourValid(false);
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

    }, [currentUpdate, refresh])

    function addItem(e) {
        if (nameValid && endDateValid && startDateValid && colourValid) {
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
                .then(needUpdate(!currentUpdate))
                .then(setRefresh(refresh))
                .then(toggle())
                .catch(e => console.log(e));
        }

    }

    useEffect(() => {
        validate();
    }, [name, endDate, startDate, colour])

    if (success) {
        return (
            <div>
            <div className="todaysHabits">
                <Card className="todaysHabits" >
                    <CardTitle className="listTitle">Todays Habits</CardTitle>
                    <div onClick={toggle} className="addButton">
                        <FaRegPlusSquare className="addButton" />
                    </div>
                    <CardBody>
                            {todaysHabits.map(habit =>
                                <TodaysHabit key={habit.id} id={habit.id} name={habit.name} isComplete={habit.isComplete} needUpdate={needUpdate} currentUpdate={currentUpdate}/>
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
                                    <Input invalid={!nameValid} type="text" name="name" id="name" onChange={handleInputChange} placeholder="Item name" />
                                    {!nameValid && <FormFeedback >Title cannot be empty</FormFeedback>}
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
                                            invalid={!startDateValid}
                                        />
                                        {!startDateValid && <FormFeedback className="dat">cannot be empty</FormFeedback>}
                                    </div>
                                        <div className="endDate">
                                            <Label>End Date</Label>
                                            <Input
                                                className="date"
                                                type="date"
                                                name="endDate"
                                            id="exampleDate"
                                            onChange={handleInputChange}
                                            invalid={!endDateValid}
                                        />
                                        {!endDateValid && <FormFeedback >End Date cannot be before start date</FormFeedback>}
                                    </div>
                                    <Row className="changeDisplay">
                                        <Col>
                                    <div className ="repeat">
                                                <Label>Repeat</Label>
                                                <RepeatSelect repeat={repeat} setRepeat={setRepeat} setIsVisible={setIsVisible} />
                                    </div>
                                  
                                    <div>
                                        <div /*HexColorPicker color={colour} onChange={handleChange} */ />
                                                <Label>Colour<span className="questionMark" onClick={colourToggle}>?</span></Label>
                                                <Input invalid={!colourValid} type="text" name="colour" id="colour" onChange={handleInputChange} defaultValue={colour} />
                                                {!colourValid && <FormFeedback>Must be a valid hex colour. A # followed by 6 letters or numbers </FormFeedback>}
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
                <div>
                    <Modal isOpen={colourModal} toggle={colourToggle}>
                        <ModalHeader toggle={colourToggle}>Colour Information</ModalHeader>
                        <ModalBody>
                            <div>
                                <p>Please Insert a HEX Colour this can be chosen from: https://www.w3schools.com/colors/colors_picker.asp  </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={colourToggle} >Cancel</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
    return (<p> loading </p>)


}
export default TodaysHabits
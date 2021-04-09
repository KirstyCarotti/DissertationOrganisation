﻿import React, { useEffect, useState } from 'react'
import './Habit.css';
import {
    Input,
    Row,
    Col,
    Label,
    Form,
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback
} from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import RepeatSelect from './RepeatSelect.js';
import RepeatDays from './RepeatDays.js';

const HabitInKey = (props) => {
    const { habit, update, setUpdate } = props;

    const [colour, setColour] = useState("#207bd7");
    const [colourValid, setColourValid] = useState(false);

    const [isMeasurable, setIsMeasurable] = useState(false);

    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [startDateValid, setStartDateValid] = useState(false);

    const [endDate, setEndDate] = useState(null);
    const [endDateValid, setEndDateValid] = useState(false);

    const [repeat, setRepeat] = useState(null);
    const [repeatDays, setRepeatDays] = useState([]);

    const [numberOfBlocks, setNumberOfBlocks] = useState();
    const [blocksValid, setBlocksValid] = useState(false);

    const [representationOfBlocks, setRepresentationOfBlocks] = useState("");


    const [deleteModal, setDeleteModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    const deleteToggle = () => setDeleteModal(!deleteModal);
    const toggle = () => setModal(!modal);

    const [colourModal, setColourModal] = useState(false);
    function colourToggle() {
        setColourModal(!colourModal)
    }

    //https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/
    //talk about this in write up 

    useEffect(() => {
        fetch('https://localhost:44388/api/habits/' + habit.id,
            {
                method: "Get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setColour(response.colour != null ? response.colour : "");
                setIsMeasurable(response.mesurable);
                setRepeatDays(response.repeatDays);
                setRepeat(response.repeat);
                setEndDate(response.endDate?.split('T')[0]);
                setStartDate(response.startDate.split('T')[0]);
                setDescription(response.description);
                setName(response.name);
                setNumberOfBlocks(response.numberOfBlocks);
                setRepresentationOfBlocks(response.representationOfBlocks);
                setSuccess(true)
            })
            .catch(e => console.log(e));

    }, [])


    useEffect(() => {
        validate();
    }, [name, endDate, startDate, colour, numberOfBlocks])

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
        else if (name == "colour") {
            setColour(value);
        }
        else if (name == "numberOfBlocks") {
            setNumberOfBlocks(value);
        }
        else if (name == "representationOfBlocks") {
            setRepresentationOfBlocks(value);
        }
        validate(); 
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

        if (isMeasurable) {
            var reg = new RegExp('^[0-9]+$');
            if (numberOfBlocks != "" && reg.test(numberOfBlocks)) {
                setBlocksValid(true);
            } else {
                setBlocksValid(false)
            }
        } else {
            setBlocksValid(true)
        }

    }


    function deleteHabit(e) {
        deleteToggle();
        fetch('https://localhost:44388/api/habits/' + habit.id,
            {
                method: "Delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .catch(e => console.log(e));
        setUpdate(!update)

    }

    function handleSave(e) {
        if (nameValid && endDateValid && startDateValid && colourValid && blocksValid) {
            fetch('https://localhost:44388/api/habits/' + habit.id,
                {
                    method: "Put",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: habit.id,
                        name: name,
                        description: description,
                        startDate: startDate,
                        endDate: endDate,
                        repeat: repeat,
                        repeatDays: repeatDays,
                        colour: colour,
                        mesurable: isMeasurable,
                        numberOfBlocks: parseInt(numberOfBlocks),
                        representationOfBlocks: representationOfBlocks
                    }),
                }).then(setUpdate(!update))
                .then(setModal(!modal))
                .catch(e => console.log(e));
        }
    }
    if (success) {
        return (
            <div>
                <span className="habitCol" style={{ backgroundColor: habit.colour }}>&nbsp;&nbsp;&nbsp;</span>
                <div className="habitName">{habit.name}</div>
                <span onClick={toggle} className="editButton">
                    <FaEdit className="editButton" />
                </span>
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Habit</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input invalid={!nameValid} type="text" name="name" id="name" onChange={handleInputChange} defaultValue={name} />
                                    {!nameValid && <FormFeedback >Title cannot be empty</FormFeedback>}
                                    <Label>Description</Label>
                                    <Input type="textarea" name="description" id="exampleText" onChange={handleInputChange} defaultValue={description} />
                                    <div className="habitDate">
                                        <Label>Start Date</Label>
                                        <Input
                                            className="date"
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            defaultValue={startDate}
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
                                            id="endDate"
                                            defaultValue={endDate}
                                            onChange={handleInputChange}
                                            invalid={!endDateValid}
                                        />
                                        {!endDateValid && <FormFeedback >End Date cannot be before start date</FormFeedback>}
                                    </div>
                                    <Row className="changeDisplay">
                                        <Col>
                                            <div className="repeat">
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
                                    {isMeasurable &&
                                        <div>
                                            <div className="habitDate">
                                                <Label>Habit Split into</Label>
                                                <Input
                                                    className="date"
                                                    type="text"
                                                    name="numberOfBlocks"
                                                    id="blocks"
                                                onChange={handleInputChange}
                                                defaultValue={numberOfBlocks}
                                                invalid={!blocksValid}
                                            />
                                                {!blocksValid && <FormFeedback>Must be an integer</FormFeedback>}
                                            </div>
                                            <div className="endDate">
                                                <Label>blocks of:</Label>
                                                <Input
                                                    className="date"
                                                    type="text"
                                                    name="representationOfBlocks"
                                                id="infoBlocks"
                                                defaultValue={representationOfBlocks}
                                                onChange={handleInputChange}
                                            />
                                            </div>
                                        </div>
                                    }
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={handleSave}>Save</Button>{' '}
                            <Button color="danger" onClick={deleteToggle}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={deleteModal} toggle={deleteToggle}>
                        <ModalHeader toggle={deleteToggle}>Delete {name}</ModalHeader>
                        <ModalBody>
                            <div>
                                <p> Are you sure you want to delete {name}? You will not be able to recover it once deleted. </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={deleteHabit}>Delete</Button>
                            <Button color="secondary" onClick={deleteToggle} >Cancel</Button>{' '}
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
    } return (<p> error </p>)
}
   
export default HabitInKey
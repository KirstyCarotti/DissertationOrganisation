import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    ModalFooter,
    Button,
    Row,
    Col,
    FormText
} from 'reactstrap';
import './Schedule.css';
import RepeatSelect from './RepeatSelect.js';
import RepeatDays from './RepeatDays.js';

const ScheduleMinute = (props) => {
    const { event, isFirst, setUpdate, update } = props;
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleTime, setIsVisibleTime] = useState(true);

    const [title, setTitle] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [startDate, setStartDate] = useState(event.startDate.split('T')[0]);
    const [endDate, setEndDate] = useState(event.endDate==null ? null : event.endDate.split('T')[0]);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);
    const [repeat, setRepeat] = useState(event.repeat);
    const [repeatDays, setRepeatDays] = useState(event.repeatDays);
    const [colour, setColour] = useState(event.colour);
    const [isAllDay, setIsAllDay] = useState(false);

    const [colourModal, setColourModal] = useState(false);
    function colourToggle() {
        setColourModal(!colourModal)
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "title") {
            setTitle(value);
        }
        else if (name === "description") {
            setDescription(value);
        }
        else if (name === "location") {
            setLocation(value)
        }
        else if (name === "StartDate") {
            setStartDate(value)
        }
        else if (name === "EndDate") {
            setEndDate(value)
        }
        else if (name === "startTime") {
            setStartTime(value)
        }
        else if (name === "endTime") {
            setEndTime(value)
        }
        else if (name === "colour") {
            setColour(value)
        }
        else if (name === "allDay") {
            setIsAllDay(!isAllDay)
            setIsVisibleTime(!isVisibleTime)

        }


    }

    function deleteEvent(e) {
        toggle();
        deleteToggle();
        fetch('https://localhost:44388/api/events/' + event.id,
            {
                method: "Delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(setUpdate(!update))
            .catch(e => console.log(e));


    }

    function editEvent(e) {
        fetch('https://localhost:44388/api/events/'+event.id,
            {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: event.id,
                    name: title,
                    description: description,
                    location: location,
                    startDate: startDate,
                    endDate: endDate,
                    startTime: startTime,
                    endTime: endTime,
                    repeat: repeat,
                    repeatDays: repeatDays,
                    colour: colour,
                    isAllDay: isAllDay
                }),
            })
            .then(setUpdate(!update))
            .then(toggle())
            .catch(e => console.log(e));
    }

    function toggle() {
        setModal(!modal);
        isVisible ? setIsVisible(!isVisible) : setIsVisible(false);
        isVisibleTime ? setIsVisibleTime(isVisibleTime) : setIsVisibleTime(true);
    }

    const deleteToggle = () => setDeleteModal(!deleteModal);

    return (
        <div>
            <div>
            <Col sm="6" key={event.id} className="event" style={{ backgroundColor: event.colour }}>
                {event.id === isFirst.id && <span onClick={toggle} >{event.name}</span>}
                {event.id != isFirst.id && <span >&nbsp;</span>}
            </Col>
             <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Event</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                            <Input type="text" name="title" id="title" onChange={handleInputChange} defaultValue={title} placeholder="Item name" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                            <Input type="textarea" name="description" id="exampleText" defaultValue={description} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Location</Label>
                            <Input type="text" name="location" id="exampleText" defaultValue={location} onChange={handleInputChange} />
                            </FormGroup>
                        <div className="habitDate">
                            <Label>Start Date</Label>
                            <Input
                                className="date"
                                type="date"
                                name="startDate"
                                id="exampleDate"
                                defaultValue={startDate}
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
                                defaultValue={endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="measurable">
                            <Input type="checkbox" name="allDay" checked={isAllDay} onChange={handleInputChange} />
                            <span>All Day</span>
                        </div>
                        {isVisibleTime &&
                        <div>
                            <div className="habitDate">
                            <Label>Start Time</Label>
                            <Input
                                className="time"
                                type="time"
                                name="startTime"
                                id="exampleTime"
                                defaultValue={startTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="endDate">
                            <Label>End Time</Label>
                            <Input
                                className="time"
                                type="time"
                                name="endTime"
                                id="exampleTime"
                                defaultValue={endTime}
                                onChange={handleInputChange}
                            />
                            </div>
                            </div>}
                        <FormGroup>
                            <Row>
                                <Col>
                                    <div className="repeat">
                                        <Label>Repeat</Label>
                                        <RepeatSelect repeat={repeat} setRepeat={setRepeat} setIsVisible={setIsVisible} />
                                    </div>

                                    <div>
                                        <div /*HexColorPicker color={colour} onChange={handleChange} */ />
                                            <Label>Colour<span className="questionMark" onClick={colourToggle}>?</span></Label>
                                            <Input type="text" name="colour" id="colour" onChange={handleInputChange} defaultValue={colour} />
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
                        <Button color="success" onClick={editEvent}>Save</Button>{' '}                   
                        <Button color="danger" onClick={deleteToggle}>Delete</Button>
                    </ModalFooter >
                </Modal >
            </div >
            <div>
                <Modal isOpen={deleteModal} toggle={deleteToggle}>
                 <ModalHeader toggle={deleteToggle}>Delete {title}</ModalHeader>
                <ModalBody>
                    <div>
                        <p> Are you sure you want to delete {title}? You will not be able to recover it once deleted. Note: This will delete all occurences of the event. </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteEvent}>Delete</Button>
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

}
export default ScheduleMinute

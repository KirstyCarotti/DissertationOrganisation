import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    thead,
    tr,
    th,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import ScheduleMinute from './ScheduleMinute.js';
import RepeatSelect from './RepeatSelect.js';
import RepeatDays from './RepeatDays.js';
import './Schedule.css';


const Schedule = (props) => {
    const { currentDate } = props;
    console.log(currentDate)
    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(currentDate.split('T')[0]);
    const [endDate, setEndDate] = useState(currentDate.split('T')[0]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [repeat, setRepeat] = useState(null);
    const [repeatDays, setRepeatDays] = useState([]);
    const [colour, setColour] = useState("");
    const [isAllDay, setIsAllDay] = useState(false);

    const [update, setUpdate] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleTime, setIsVisibleTime] = useState(true);

    const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', ]

    const block1 = parseInt("00");
    const block2 = 15;
    const block3 = 30;
    const block4 = 45;


    function toggle() {
        setModal(!modal);
        isVisible ? setIsVisible(!isVisible) : setIsVisible(false);
        isVisibleTime ? setIsVisibleTime(isVisibleTime) : setIsVisibleTime(true);
        setColour("#207bd7");
        setRepeatDays([]);
        setRepeat(null);
        setEndDate(null);
        setStartDate(null);
        setDescription("");
        setTitle("");
        setIsAllDay(false)
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
        else if (name === "startDate") {
            setStartDate(value)
        }
        else if (name === "endDate") {
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

    function addEvent(e) {
        fetch('https://localhost:44388/api/events/',
            {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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

    useEffect(() => {
        fetch('https://localhost:44388/api/events',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setEvents(response);
            })
            .catch(e => console.log(e));

    }, [update])


    return (
        <div className = "schedule">
            <Table>
                <thead> 
                    <tr>
                        <th className="timeCol">  <div onClick={toggle} className="addEvent">
                            <FaRegPlusSquare className="addEvent" />
                        </div>
                            </th>
                        <th className= "scheduleTitle">Schedule</th>
                    </tr>
                </thead>
                {times.map(time =>
                    <tr key={time}>
                        <td className="timeCol">{time}</td>
                        <td className = "dataCol">
                            <Container>
                                <Row xs="1">
                                    <Col className="removePadding">
                                        <ScheduleMinute timeBlock={time} subBlock={block1} events={events} setUpdate={setUpdate} update={update} />
                                    </Col>
                                    <Col className="removePadding">
                                        <ScheduleMinute timeBlock={time} subBlock={block2} events={events} setUpdate={setUpdate} update={update} />
                                        </Col>
                                    <Col className="removePadding">
                                        <ScheduleMinute timeBlock={time} subBlock={block3} events={events} setUpdate={setUpdate} update={update} />
                                    </Col>
                                    <Col className="removePadding">
                                        <ScheduleMinute timeBlock={time} subBlock={block4} events={events} setUpdate={setUpdate} update={update} />
                                    </Col>
                                </Row>
                            </Container>
                            
                        </td> 
                    </tr>
                )}
            </Table>
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Event</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" name="title" id="title" onChange={handleInputChange} placeholder="Item name" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="textarea" name="description" id="exampleText" onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Location</Label>
                                <Input type="text" name="location" id="exampleText" onChange={handleInputChange} />
                            </FormGroup>
                            <div className="habitDate">
                                <Label>Start Date</Label>
                                <Input
                                    className="date"
                                    type="date"
                                    name="startDate"
                                    id="exampleDate"
                                    defaultValue={currentDate.split('T')[0]}
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
                                    defaultValue={currentDate.split('T')[0]}
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
                                            defaultValue={currentDate.split('T')[1]}
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
                                            defaultValue={currentDate.split('T')[1]}
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
                                            <Label>Colour </Label>
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
                        <Button color="success" onClick={addEvent}>Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )


}
export default Schedule
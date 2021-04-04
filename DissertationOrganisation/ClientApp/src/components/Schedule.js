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
import './Schedule.css';


const Schedule = (props) => {
    const { currentDate } = props;

    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(currentDate);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [update, setUpdate] = useState(true);

    const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', ]

    const block1 = parseInt("00");
    const block2 = 15;
    const block3 = 30;
    const block4 = 45;


    function toggle() {
        setModal(!modal);
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
        else if (name === "date") {
            setDate(value)
        }
        else if (name === "startTime") {
            setStartTime(value)
        }
        else if (name === "endTime") {
            setEndTime(value)
        }

    }

    function addEvent(e) {
        toggle();
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
                    date: date,
                    startTime: startTime,
                    endTime: endTime
                }),
            })
            .then(setUpdate(!update))
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
                            <FormGroup>
                                <Label>Date</Label>
                                <Input type="date" name="date" id="exampleText" defaultValue={currentDate.split('T')[0]} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Start Time</Label>
                                <Input type="time" name="startTime" id="exampleText" defaultValue={currentDate.split('T')[1]} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>EndTime</Label>
                                <Input type="time" name="endTime" id="exampleText" defaultValue={currentDate.split('T')[1]} onChange={handleInputChange} />
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
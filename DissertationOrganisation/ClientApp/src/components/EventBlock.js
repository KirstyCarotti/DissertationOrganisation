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
    Col
} from 'reactstrap';
import './Schedule.css';

const ScheduleMinute = (props) => {
    const { event, isFirst, setUpdate, update } = props;
    const [modal, setModal] = useState(false)

    const [title, setTitle] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date.split('T')[0]);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);

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

    function editEvent(e) {
        toggle();
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
                    date: date,
                    startTime: startTime,
                    endTime: endTime
                }),
            })
            .then(setUpdate(!update))
            .catch(e => console.log(e));
    }

    function toggle() {
        setModal(!modal);
    }

    console.log(event)

    return (
            <div>
            <Col sm="6" key={event.id} className="event" onClick={toggle} >
                {event.id === isFirst.id && <span >{event.name}</span>}
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
                            <FormGroup>
                                <Label>Date</Label>
                                <Input type="date" name="date" id="exampleText" defaultValue={date} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                            <Label>Start Time</Label>
                            <Input type="time" name="startTime" id="exampleText" defaultValue={startTime} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                            <Label>EndTime</Label>
                            <Input type="time" name="endTime" id="exampleText" defaultValue={endTime} onChange={handleInputChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={editEvent}>Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            </div>
        )

}
export default ScheduleMinute

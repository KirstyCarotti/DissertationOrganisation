import React, { useEffect, useState } from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import './Schedule.css';
import EventBlock from './EventBlock.js';


const ScheduleMinute = (props) => {
    const { timeBlock, subBlock, events, setUpdate, update } = props;
    const [hasEvent, setHasEvent] = useState(false);
    const [isFirst, setIsFirst] = useState([]);
    const [eventsInBlock, setEventsInBlock] = useState([])
    useEffect(() => {
        var blockEvents = [] 
        var block = parseInt(timeBlock.split(':')[0]);
        for (var i = 0; i < events.length; i++) {

            var startTimeSplit = events[i].startTime.split(':');
            var startTimeOne = parseInt(startTimeSplit[0]) 
            var startTimeTwo = parseInt(startTimeSplit[1]) 

            var endTimeSplit = events[i].endTime.split(':');
            var endTimeOne = parseInt(endTimeSplit[0])
            var endTimeTwo = parseInt(endTimeSplit[1]) 

            //event starts before
            if (startTimeOne < block) {    
                if (endTimeOne > block) {
                    setHasEvent(true);
                    blockEvents.push(events[i]);
                } else if (endTimeOne == block) {

                    if (endTimeTwo >= 45 && endTimeTwo <= 59 && subBlock == 45) {
                        setHasEvent(true);
                        blockEvents.push(events[i]);
                    } else if (endTimeTwo >= 30 && endTimeTwo <= 59 && subBlock == 30) {
                        setHasEvent(true);
                        blockEvents.push(events[i]);
                    } else if (endTimeTwo >= 15 && endTimeTwo <= 59 && subBlock == 15) {
                        setHasEvent(true);
                        blockEvents.push(events[i]);
                    } else if (endTimeTwo >= 0 && endTimeTwo <= 59 && subBlock == 0) {
                        setHasEvent(true);
                        blockEvents.push(events[i]);
                    }
                } 
            } else if (startTimeOne == block) {
                if (startTimeTwo >= 0 && startTimeTwo <= 14 && subBlock == 0) {
                    setHasEvent(true)
                    setIsFirst(events[i])
                    blockEvents.push(events[i]);
                } else if (startTimeTwo >= 0 && startTimeTwo <= 29 && subBlock == 15) {
                    setHasEvent(true)
                    blockEvents.push(events[i]);
                    if (startTimeTwo >= 15) {
                        setIsFirst(events[i])
                    }

                } else if (startTimeTwo >= 0 && startTimeTwo <= 44 && subBlock == 30) {
                    setHasEvent(true)
                    blockEvents.push(events[i]);
                    if (startTimeTwo >= 30) {
                        setIsFirst(events[i])
                    }
                } else if (startTimeTwo >= 0 && startTimeTwo <= 59 && subBlock == 45) {
                    setHasEvent(true)
                    blockEvents.push(events[i]);
                    if (startTimeTwo >= 45) {
                        setIsFirst(events[i])
                    }
                }
            } 

        }
        setEventsInBlock(blockEvents)
    }, [events, update])


    if (hasEvent) {
        return (
        <div>
                {eventsInBlock.map(e =>
                    <EventBlock key={e.id} event={e} isFirst={isFirst} setUpdate={setUpdate} update={update} />
            )}
        </div>
        )
    } 
    return (<div className="emptyEvent">&nbsp;</div>)


}
export default ScheduleMinute

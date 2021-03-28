import React, { Component } from 'react';
import HabitCalendar from './HabitCalendar.js';
import HabitKey from './HabitKey.js';
import TodaysHabits from './TodaysHabits.js';

export class HabitTrackerPage extends Component {

    render() {
        return (
            <span>
                <div className="habitContainer">
                    <HabitCalendar />
                    <TodaysHabits />
                </div>
                <HabitKey />
            </span>
        );
    }
}

import React from "react";
import "./EventsList.css";
import { v4 as uuidv4 } from "uuid";
import Event from "../Event/Event";
import FilterListBar from "../FilterListBar/FilterListBar";

export default function EventsList({ eventsList, setEventsList }) {
  return (
    <div id="list" className="eventsList">
      <FilterListBar
        eventsList={eventsList}
        setEventsList={setEventsList}
      ></FilterListBar>
      {eventsList.map((event) => {
        return (
          <Event
            key={event._id}
            event={event}
            setEventsList={setEventsList}
          ></Event>
        );
      })}
    </div>
  );
}

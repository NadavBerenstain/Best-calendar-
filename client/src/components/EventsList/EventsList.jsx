import React from "react";
import "./EventsList.css";
import { v4 as uuidv4 } from "uuid";

function EventsList({ eventsList }) {
  return (
    <div key={uuidv4()} id="list" className="eventsList">
      {eventsList.map((event) => {
        // console.log(event);
        return (
          <div key={uuidv4()}>
            <h2 className="title">{event.title}</h2>
            <div className="notes">{event.notes}</div>
            <div className="date">{event.date}</div>
          </div>
        );
      })}
    </div>
  );
}

export default EventsList;

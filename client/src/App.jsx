import { useState, useEffect } from "react";
import "./App.css";
import apiService from "./ApiService";
import EventsList from "./components/EventsList/EventsList";
import Nav from "./components/Nav/Nav";
import CreatEvent from "./components/CreatEvent/CreatEvent";

function App() {
  const [Event, setEvent] = useState({
    title: "",
    date: "",
    notes: "",
    important: false,
  });
  const [eventsList, setEventsList] = useState([]);
  const [baseList, setBaseList] = useState([]);

  useEffect(() => {
    apiService
      .getList()
      .then((responseData) => {
        setEventsList(responseData);
        setBaseList(responseData);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
      });
  }, []);
  return (
    <div id="allApp">
      {/* <Nav></Nav> */}
      <div id="mainApp">
        <div id="list">
          <EventsList
            eventsList={eventsList}
            setEventsList={setEventsList}
            baseList={baseList}
            setBaseList={setBaseList}
          ></EventsList>
        </div>
        <div id="form">
          <CreatEvent
            Event={Event}
            setBaseList={setBaseList}
            setEvent={setEvent}
            setEventList={setEventsList}
          ></CreatEvent>
        </div>
      </div>
    </div>
  );
}

export default App;

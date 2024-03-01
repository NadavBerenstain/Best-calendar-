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

  const BASE_URL = "http://localhost:3000/calendar";

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
    <>
      <Nav></Nav>
      <CreatEvent
        Event={Event}
        setBaseList={setBaseList}
        setEvent={setEvent}
        setEventList={setEventsList}
      ></CreatEvent>
      <EventsList
        eventsList={eventsList}
        setEventsList={setEventsList}
        baseList={baseList}
        setBaseList={setBaseList}
      ></EventsList>
    </>
  );
}

export default App;

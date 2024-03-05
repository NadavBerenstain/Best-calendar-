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
    theme: "",
    important: false,
  });
  const [eventsList, setEventsList] = useState([]);
  const [baseList, setBaseList] = useState([]);
  const [themesList, setThemesList] = useState([]);

  useEffect(() => {
    apiService
      .getList()
      .then((responseData) => {
        setEventsList(responseData);
        setBaseList(responseData);
        const themes = responseData.map((event) => event.theme);
        themes.filter((theme, index) => themes.indexof(theme) === index);
        setThemesList(themes);
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
            themesList={themesList}
            setThemesList={setThemesList}
          ></EventsList>
        </div>
        <div id="form">
          <CreatEvent
            Event={Event}
            setBaseList={setBaseList}
            setEvent={setEvent}
            setEventList={setEventsList}
            themesList={themesList}
            setThemesList={setThemesList}
          ></CreatEvent>
        </div>
      </div>
    </div>
  );
}

export default App;

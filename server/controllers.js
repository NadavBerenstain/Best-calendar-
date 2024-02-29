const { Events } = require("./models");

exports.createEvent = async (req, res) => {
  console.log(`here: ${req.body}`);
  try {
    const result = await Events.create(req.body);
    res.status(201);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.getSortedList = async (req, res) => {
  try {
    const events = await Events.find({});
    res.status(200);

    events.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    res.send(events);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("params:" + req.params);
    const result = await Events.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Event not found.");
    }
    res.status(200).send(" deleted💪");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInfo = req.body;
    const result = await Events.findOneAndUpdate({ _id: id }, updatedInfo, {
      new: true,
    });
    if (!result) {
      return res.status(404).send("Event not found.");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//////////////////////////////////////////////// apiservice:
// const BASE_URL = "http://localhost:3000";

// const apiService = {};

// apiService.getList = () => {
//   fetch(`${BASE_URL}/calendar`)
//     .then((response) => response.json())
//     .then((responseData) => {
//       const nextEvents = responseData.filter(
//         (event) => new Date(event.date).getTime() > Date.now()
//       );
//       return nextEvents;
//     });
// };

// export default apiService;

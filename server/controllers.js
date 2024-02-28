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

exports.getList = async (req, res) => {
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

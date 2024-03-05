const { Events } = require("./models");

exports.createEvent = async (req, res) => {
  try {
    const { theme } = req.body;
    const parsedThemes = theme.split(",").map((el) => el.trim());
    const result = await Events.create({ ...req.body, theme: parsedThemes });
    console.log("result theme:", result.theme);
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

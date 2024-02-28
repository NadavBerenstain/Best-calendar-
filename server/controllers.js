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

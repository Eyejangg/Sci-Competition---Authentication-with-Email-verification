import Activity from "../models/activity.model.js";
const activityController = {};
//Create and save a new activity
activityController.create = async (req, res) => {
  const {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = req.body;
  //validate data
  if (
    !name ||
    !description ||
    !type ||
    !level ||
    !team_size ||
    !date ||
    !location ||
    !reg_open ||
    !reg_close ||
    !contact_name ||
    !contact_phone ||
    !contact_email ||
    !status
  ) {
    res
      .status(400)
      .send({ message: "Name, type or ImageUrl can nit be empty na ja !!" });
    return;
  }

  await Activity.findOne({ where: { name: name } }).then((activity) => {
    if (activity) {
      res.status(400).send({ message: "Activity already exists!" });
      return;
    }
    const newActivity = {
      name: name,
      description: description,
      type: type,
      level: level,
      team_size: team_size,
      date: date,
      location: location,
      reg_open: reg_open,
      reg_close: reg_close,
      contact_name: contact_name,
      contact_phone: contact_phone,
      contact_email: contact_email,
      status: status,
    };
    Activity.create(newActivity)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "something error while creating the activity",
        });
      });
  });
};
//Get ALL
activityController.getAll = async (req, res) => {
  await Activity.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "something error while getting the activity",
      });
    });
};
//Get activity byid
activityController.getById = async (req, res) => {
  const id = req.params.id;
  await Activity.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "NO found activity with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  activity with id" + id,
      });
    });
};
//Update
activityController.update = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    type,
    level,
    team_size,
    date,
    location,
    reg_open,
    reg_close,
    contact_name,
    contact_phone,
    contact_email,
    status,
  } = req.body;
  //validate data
  if (!name && !type && !team_size) {
    res
      .status(400)
      .send({ message: "Name, type And team_size can not be empty na ja !!" });
    return;
  }
  await Activity.update(
    { name, type, team_size, ...req.body },
    {
      where: { id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Activity update successfully!" });
      } else {
        res.status(400).send({
          message:
            "Cannot update Activity with id" +
            id +
            ". Maybe activity was not found .",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  activity with id" + id,
      });
    });
};
//Delete
activityController.delete = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "Id is missing" });
    return;
  }
  await Activity.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Activity was deleted successfully" });
      } else {
        res.status(400).send({
          message: "Cannot delete activity with id" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  activity with id" + id,
      });
    });
};

activityController.searchActivity = async (req, res) => {
  const { name, type, level, status } = req.query;
  let whereClause = {};
  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }
  if (type) {
    whereClause.type = type;
  }
  if (level) {
    whereClause.level = level;
  }
  if (status) {
    whereClause.date = status;
  }
  try {
    const activities = await Activity.findAll({ where: whereClause });
    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Error retrieving activities" });
  }
};
export default activityController;

import Activity from "../models/activity.model";
const activtyController = {};

activtyController.createActivity = async (req, res) => {
  const {name, description, type, level, tem_size, data, location, req_open, contact_name,contact_email, contact_phone,status } = req.body;

  if (
    (!name || !description || !type || !level || !tem_size || !data || !location || !req_open || !contact_name || !contact_email || !contact_phone || !status)
  ) {
    res.status(400).send({ message: "Data can not be empty"});
    return;
  }

  await Activity.findOne({ Where: {name:name}}).then((ac)=>{
    if(ac){
        res.status(400).send ({ message: "Activity already exists!" });
    }

    const newActivity = {
      name,
      description,
      type,
      level,
      tem_size,
      data,
      location,
      req_open,
      contact_name,
      contact_email,
      contact_phone,
      status,
    };

    Activity.createActivity(newActivity).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500).send({ message: err.message || "Something error"})
    });
  })
};

activtyController.getAll = async (req,res) => {
    await Activity.findAll().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({ message: err.message })
    })
}

activtyController.getById = async(req,res) => {
    const id = req.params.id
    await Activity.findOne({Where:{id}}).then((data) => {
        res.send(data);
    }).then((err) => {
        res.status(400).send({ message: "Activity not found by id:" + id });
    })
}

activtyController.update = async (req, res) => {
    const id = req.params.id;

    const {
      name,
      description,
      type,
      level,
      tem_size,
      data,
      location,
      req_open,
      contact_name,
      contact_email,
      contact_phone,
      status,
    } = req.body;

    if (
      !name &&
      !description &&
      !type &&
      !level &&
      !tem_size &&
      !data &&
      !location &&
      !req_open &&
      !contact_name &&
      !contact_email &&
      !contact_phone &&
      !status
    ) {
      res.status(400).send({ message: "Data can not be empty" });
      return;
    }

    const newActivity = {
      name,
      description,
      type,
      level,
      tem_size,
      data,
      location,
      req_open,
      contact_name,
      contact_email,
      contact_phone,
      status,
    };

    await Activity.update(newActivity, { where: { id } })
    .then((num) => {
        if (num[0] === 1) {
            res.send({ message: "Update success!" })
        } else {
            res.status(400).send({
                message: `Cannot update Activity with id: ${id}. Maybe Activity not found.`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        });
    });
}

activtyController.delete = async (req,res) => {
    const id = req.params.id;
    await Activity.destroy({ where: { id }})
    .then((num)=>{
        if (num == 1){
            res.send({ message: "Delete success! "});
        }else{
            res.status(400).send({
              message: `Cannot delete Activity with id: ${id}. Maybe Activity not found.`,
            });
        }
    }).catch((err)=>{
        res.status(500).send({
            message:
            err.message || `Something error while "Delete by id: ${id}" the Activity`
        });
    });
}

activtyController.search = async (req,res) => {
    try {
        const name = req.query.name;

        if (!name){
            return res
            .status(400)
            .send({message: "Missing 'name' query parameter."})
        }
        const activity = await Activity.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        res.send(activity);
    }catch (err) {
        res.status(500).send({ message: err.message});
    }
}

export default activtyController;
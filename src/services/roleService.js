const Role = require("../models/role.model");
const MSG = require("./../shared/en-EN.json")

exports.createRole = async (req, res) => {
  Role.findOne({ name: req.body.name }, (err, role) => {
    if (err) return res.status(500).send({ message: MSG.INTERNAL_ERROR });
    if (role) return res.status(400).send({ message: MSG.ROLE_EXIST });

    const newRole = new Role(req.body);

    newRole.save((err, role) => {
      if (err) return res.status(500).send({ message: MSG.ROLE_FAIL });
      res.send({ message: MSG.ROLE_SUCESS, role: role });
    });
  });
}

exports.updateRole = async (req, res) => {
  try {
    const filter = { name: req.params.name };
    const update = { name: req.body.name };
    const options = { new: true };
    Role.findOne({ name: req.params.name }, (err, rol) => {
      if (err) return res.status(500).send({ message: MSG.INTERNAL_ERROR });
      if (!rol) return res.status(400).send({ message: MSG.ROLE_NOT_FOUND });

      Role.updateOne(filter, update, options, (err, role) => {
        if (err) return res.status(500).send({ message: MSG.ROLE_UPDATE_FAIL });
        if (role.modifiedCount === 0) return res.status(400).send({ message: MSG.ROLE_NOT_FOUND });
        if (role.modifiedCount === 1) return res.status(200).send({ message: MSG.ROLE_UPDATE_SUCESS, role: update });
      });
    });
  } catch (error) {

  }
}

exports.deleteRole = async (req, res) => {
  try {
    const filter = { name: req.params.name };
    await Role.deleteOne(filter, (err, role) => {
      if (err) return res.status(500).send({ message: err });
      if (role.deletedCount === 0) return res.status(400).send({ message: "Role not found!" });
      if (role.deletedCount === 1) return res.status(200).send({ message: "Role was deleted successfully!" });
    });
  } catch (error) {

  }
}

exports.getRoles = async (req, res) => {
  try {
    await Role.find((err, roles) => {
      if (err) return res.status(500).send({ message: err });
      if (roles.length === 0) return res.status(400).send({ message: "Roles not found!" });
      return res.status(200).send({ message: "Success", roles });
    });
  } catch (error) {

  }
}
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require("../helper/formatResponse");

exports.create = async (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json(errorResponse("Data not found!"));
  }

  const { firstName, lastName, displayName, phone, email, password, gender } = req.body;

  if (!password) {
    return res.status(400).json(errorResponse("Password is required!"));
  }

  const user = {
    firstName,
    lastName,
    displayName,
    phone,
    email,
    password: await bcrypt.hash(password, 10),
    gender
  };

  userModel.create(user)
    .then(async (data) => {
      console.log("user created successfully:");

      res.send(data);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.read = (req, res) => {
  console.log(req.user);
  console.log(req.query);

  let email = req.query.email ? req.query.email : null;
  if (email) {
    let searchParams = {};
    searchParams.email = email;
    userModel.fetchSingle(searchParams)
      .then((data) => {
        if (data) {
          return res.status(200).json(successResponse("Data exist", data));
        } else {
          return res.status(400).json(errorResponse("User not find"));
        }
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        return res.status(500).json(errorResponse(err.message));
      });
  } else {
    userModel.fetchAll(id)
      .then((data) => {
        return res.status(200).json(successResponse(200, true, "Data exist", data));
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        res.status(500).send({
          message: err.message || "Internal error",
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      Error: "Empty Content",
    });
  }

  let userID = req.query.id ? req.query.id : "";
  let userData = {};
  userData.firstName = req.body.firstName || null;
  userData.lastName = req.body.lastName || null;
  userData.phoneNumber = req.body.phoneNumber || null;
  userData.email = req.body.email || null;
  userData.status = req.body.status || null;

  userData = Object.fromEntries(
    Object.entries(userData).filter(([key, value]) => value !== null)
  );

  user.modify(userID, userData)
    .then((data) => {
      console.log("user updated successfully:", data);
      res.send(data); // Send response with inserted user data
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.delete = (req, res) => {
  let id = req.query.id ? req.query.id : null;
  if (id) {
    user.delete(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        res.status(500).send({
          message: err.message || "Internal error",
        });
      });
  }
};

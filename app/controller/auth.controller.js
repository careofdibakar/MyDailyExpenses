const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require("../helper/formatResponse");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!email) {
        return res.status(400).json(errorResponse("Email missing!"));
    }
    if (!password) {
        return res.status(400).json(errorResponse("Password missing!"));
    }

    if (email) {
        let searchParams = {};
        searchParams.email = email;
        userModel.fetchSingle(searchParams)
            .then(async (data) => {
                if (data) {
                    const loginResponse = await bcrypt.compare(password, data.password);
                    if (loginResponse == true) {

                        const userResponse = data.toObject();
                        delete userResponse.password;

                        const token = jwt.sign({ id: data._id, email: data.email }, JWT_SECRET, { expiresIn: '1h' });
                        return res.status(200).json(successResponse("Logged in", { user: userResponse, token }));
                    } else {
                        return res.status(200).json(errorResponse("Wrong password"));
                    }
                } else {
                    return res.status(400).json(errorResponse("User not find"));
                }
            })
            .catch((err) => {
                console.error("Error creating user:", err);
                return res.status(500).json(errorResponse(err.message));
            });
    }
};
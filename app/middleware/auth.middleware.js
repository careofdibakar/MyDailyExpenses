const { successResponse, errorResponse } = require("../helper/formatResponse");
const jwt = require("jsonwebtoken");

exports.tokenValidate = (req, res, next) => {
    // console.log(req.headers);

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json(errorResponse("Token missing!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json(errorResponse("Invalid token!"));
        }

        req.user = decoded;

        next();
    });
};

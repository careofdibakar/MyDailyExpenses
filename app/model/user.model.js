const User = require("../model/user.schema");

exports.create = async (userData) => {
    const newUser = new User(userData);
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return err;
    }
};

exports.fetchSingle = async (searchParams) => {
    try {
        const response = await User.findOne(searchParams);
        return response;
    } catch (err) {
        return err;
    }
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    displayName: { type: String, required: false },
    phone: { type: String, unique: false, minlength: 10, maxlength: 15 },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ }, // Added regex for email validation
    password: { type: String, minlength: 8, maxlength: 256, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

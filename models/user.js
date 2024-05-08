const mongoose = require('mongoose');

// User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

// Index the email field for faster query performance
UserSchema.index({ email: 1 }, { unique: true }); // Create a unique index on email

const User = mongoose.model('User', UserSchema);

module.exports = User;
const mongoose = require('mongoose');
const constants = {
    ROLE: {
        ADMIN: 'admin',
    }
};
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
module.exports.constants = constants;

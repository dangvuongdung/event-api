const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Number, required: true }, // unit is days
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

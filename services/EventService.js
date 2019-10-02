const moment = require('moment');
const { pagination } = require('../utils/commonFunc');

class EventService {
    async getEvent(principal, params) {
        let { page, limit } = params;

        page = !page ? 1 : Number(page);
        limit = !limit ? 10 : Number(limit);

        const data = await Event.find().lean();

        const eventValid = data.filter((item) => {
            return moment(item.startDate).add(item, 'days') > moment();
        });

        const { total, pages, offset } = pagination(eventValid.length, page, limit);
        const resultData = eventValid.slice(offset).slice(0, limit);

        const result = { total, pages, list: resultData };
        return jsonSuccess(result);
    }

    async createEvent(principal, params) {
        const { name, startDate, dueDate, description } = params;

        const event = await Event.findOne({ name }).lean();
        if (event) return jsonError(errors.DUPLICATE_NAME_ERROR);

        const newEvent = new Event({ name, startDate, dueDate, description });
        await newEvent.save();

        return jsonSuccess(newEvent);
    }

    async updateEvent(principal, body, params) {
        const { name, startDate, dueDate, description } = body;
        const { id } = params;

        const checkName = await Event.findOne({ name, _id: { $ne: id } }).lean();
        if (checkName) return jsonError(errors.DUPLICATE_NAME_ERROR);

        const event = await Event.findById(id).lean();
        if (!event) return jsonError(errors.NOT_FOUND_ERROR);

        const data = await Event.findOneAndUpdate({ _id: id }, { name, startDate, dueDate, description }, { new: true });

        return jsonSuccess(data);
    }

    async deleteEvent(principal, params) {
        const { id } = params;

        const event = await Event.findById(id).lean();
        if (!event) return jsonError(errors.NOT_FOUND_ERROR);

        await Event.findOneAndDelete({ _id: id });

        return jsonSuccess();
    }
}

module.exports = EventService;

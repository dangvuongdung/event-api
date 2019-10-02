// eslint-disable-next-line new-cap
const router = require('express').Router();
const validators = require('../middleware/validators');
const policies = require('../middleware/policies');

router.get('/events', [
], (req, res) => {
    (async () => {
        return await eventService.getEvent(null, req.query);
    })()
        .then((result) => {
             res.status(result.success ? 200 : 400).json(result);
        })
        .catch((err) => {
            log.error('get_events', err);
            res.status(500).json(jsonError(errors.SYSTEM_ERROR));
        });
});

router.post('/events', [
    policies.authenticated(),
    validators.valueRequired({ attributes: ['name', 'startDate', 'dueDate', 'description'] }),
    validators.validDateString({ attributes: ['startDate'] }),
    validators.validNumber({ attributes: ['dueDate'] }),
], (req, res) => {
    (async () => {
        return await eventService.createEvent(req.principal, req.body);
    })()
        .then((result) => {
             res.status(result.success ? 200 : 400).json(result);
        })
        .catch((err) => {
            log.error('create_events', err);
            res.status(500).json(jsonError(errors.SYSTEM_ERROR));
        });
});

router.put('/events/:id', [
    policies.authenticated(),
    validators.valueRequired({ attributes: ['name', 'startDate', 'dueDate', 'description'] }),
    validators.validObjectIdParams({ attributes: ['id'] }),
    validators.validDateString({ attributes: ['startDate'] }),
    validators.validNumber({ attributes: ['dueDate'] }),
], (req, res) => {
    (async () => {
        return await eventService.updateEvent(req.principal, req.body, req.params);
    })()
        .then((result) => {
             res.status(result.success ? 200 : 400).json(result);
        })
        .catch((err) => {
            log.error('update_events', err);
            res.status(500).json(jsonError(errors.SYSTEM_ERROR));
        });
});

router.delete('/events/:id', [
    policies.authenticated(),
    validators.validObjectIdParams({ attributes: ['id'] }),
], (req, res) => {
    (async () => {
        return await eventService.deleteEvent(req.principal, req.params);
    })()
        .then((result) => {
             res.status(result.success ? 200 : 400).json(result);
        })
        .catch((err) => {
            log.error('delete_events', err);
            res.status(500).json(jsonError(errors.SYSTEM_ERROR));
        });
});

module.exports = {
    mount: '/api',
    router
};

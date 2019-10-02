const router = require('express').Router();
const validators = require('../middleware/validators');

router.post('/login', [
    validators.valueRequired({ attributes: ['email', 'password'] }),
    validators.validEmail({ attributes: ['email'] })
], (req, res) => {
    (async () => {
        return await userService.login(null, req.body);
    })()
        .then((result) => {
            res.status(result.success ? 200 : 400).json(result);
        })
        .catch((err) => {
            log.error('login', err);
            res.status(500).json(jsonError(errors.SYSTEM_ERROR));
        });
});

module.exports = {
    mount: '/api',
    router
};

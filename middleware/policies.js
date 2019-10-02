module.exports = {
    authenticated: () => {
        return (req, res, next) => {
            if (!req.principal || !req.principal.user)
                return res.json(jsonError(errors.NOT_AUTHENTICATED_ERROR));
            return next();
        };
    },
};

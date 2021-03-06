module.exports = {
    authenticated: () => {
        return (req, res, next) => {
            if (!req.principal || !req.principal.user)
                return res.status(401).json(jsonError(errors.NOT_AUTHENTICATED_ERROR));
            return next();
        };
    },
};

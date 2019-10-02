module.exports = {
    valueRequired: ({ attributes }) => {
        return (req, res, next) => {
            let missedAttributes = null;
            let missing = attributes.some((attr) => {
                let isMissing = !req.body || req.body[attr] === '' || req.body[attr] === undefined || req.body[attr] === null;
                if (isMissing) missedAttributes = attr;
                return isMissing;
            });
            if (missing)
                return res.status(400).json(jsonError(errors.MISSING_REQUIRED_VALUE));

            return next();
        };
    },

    validObjectIdParams: ({ attributes }) => {
        return (req, res, next) => {
            let invalid = attributes.some((attr) => {
                if (!req.params || !req.params[attr])
                    return false;
                return !req.params[attr].match(/^[0-9a-fA-F]{24}$/);
            });
            if (invalid)
                return res.status(400).json(jsonError(errors.NOT_VALID_ID));
            return next();
        };
    },

    validNumber: ({ attributes }) => {
        return (req, res, next) => {
            let invalid = attributes.some((attr) => {
                if (!req.body || !req.body[attr])
                    return false;
                return isNaN(req.body[attr]);
            });
            if (invalid)
                return res.status(400).json(jsonError(errors.NOT_VALID_NUMBER_VALUE));
            return next();
        };
    },

    validDateString: ({ attributes }) => {
        return (req, res, next) => {
            let invalid = attributes.some((attr) => {
                if (!req.body || !req.body[attr])
                    return false;
                return isNaN(Date.parse(req.body[attr]));
            });
            if (invalid)
                return res.status(400).json(jsonError(errors.NOT_VALID_DATE_VALUE));
            return next();
        };
    },

    validEmail: ({ attributes }) => {
        return (req, res, next) => {
            let invalid = attributes.some((attr) => {
                if (!req.body || !req.body[attr])
                    return false;
                return !req.body[attr].match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
            });
            if (invalid)
                return res.status(400).json(jsonError(errors.NOT_VALID_EMAIL_VALUE));
            return next();
        };
    },
};
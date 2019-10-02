module.exports = {
    valueRequired: ({ attributes }) => {
        return (req, res, next) => {
            let missedAttributes = null;
            let missing = attributes.some((attr) => {
                let isMissing = !req.body || req.body[attr] === '' || req.body[attr] === undefined || req.body[attr] === null;
                if (isMissing) missedAttributes = attr;
                return isMissing;
            });
            console.log({missedAttributes})
            if (missing)
                return res.json(jsonError(errors.MISSING_REQUIRED_VALUE));

            return next();
        };
    },
};
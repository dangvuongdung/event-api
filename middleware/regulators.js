const jwt = require("jsonwebtoken");

const requestLogger = () => {
    return (req, res, next) => {
        console.log(req.url);
        next();
    };
};

const tokenParser = () => {
    return (req, res, next) => {
        let authorization = req.header("Authorization");
        if (!authorization) return next();

        jwt.verify(authorization, getEnv("JWT_SECRET"), (err, decoded) => {
            if (err) req.principal = {};
            else req.principal = {user: decoded};
            return next();
        });
    };
};

module.exports = [requestLogger(), tokenParser()];

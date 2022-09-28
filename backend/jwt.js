const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const accessToken = process.env.TOKEN;
require("dotenv").config();

module.exports = {
    signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessToken, (err, token) => {
                if (err) {
                    reject(createHttpError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessToken, (err, payload) => {
                if (err) {
                    const message =
                        err.name == "JsonWebToken" ? "Unauthorized" : err.message;
                    return reject(createHttpError.Unauthorized(message));
                }
                resolve(payload);
            });
        });
    },
};

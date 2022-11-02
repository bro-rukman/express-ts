"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    let auth = true;
    if (auth) {
        return next();
    }
    return res.status(401).send('unauthenticated !');
};
exports.auth = auth;

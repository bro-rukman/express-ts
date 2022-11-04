"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateAuth = [
    (0, express_validator_1.check)('username').isString(),
    (0, express_validator_1.check)('password').isLength({ min: 5 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        return next();
    },
];
exports.default = validateAuth;

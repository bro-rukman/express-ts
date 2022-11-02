"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = [
    (0, express_validator_1.check)('username').isString(),
    (0, express_validator_1.check)('password').isLength({ min: 10 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log('halo');
        if (!errors.isEmpty) {
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    },
];
exports.default = validate;

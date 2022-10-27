"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', UserController_1.default.getAll);
        this.router.post('/create', UserController_1.default.create);
        this.router.get('/:id', UserController_1.default.getById);
        this.router.put('/update/:id', UserController_1.default.updateById);
        this.router.delete('/delete/:id', UserController_1.default.deleteById);
    }
}
exports.default = new UserRouter().router;

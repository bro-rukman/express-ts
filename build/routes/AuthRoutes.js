"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
class AuthRouter extends BaseRoutes_1.default {
    routes() {
        this.router.post('/register', AuthController_1.default.register);
        this.router.post('/login', AuthController_1.default.login);
    }
}
exports.default = new AuthRouter().router;

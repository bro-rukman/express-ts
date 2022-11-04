"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
const AuthValidator_1 = __importDefault(require("../middlewares/AuthValidator"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
class AuthRouter extends BaseRoutes_1.default {
    routes() {
        this.router.post('/register', AuthValidator_1.default, AuthController_1.default.register);
        this.router.post('/login', AuthValidator_1.default, AuthController_1.default.login);
        this.router.get('/profile', AuthMiddleware_1.auth, AuthController_1.default.profile);
    }
}
exports.default = new AuthRouter().router;

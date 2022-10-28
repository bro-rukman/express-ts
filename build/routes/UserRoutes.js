"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
class UserRouter extends BaseRoutes_1.default {
    routes() {
        this.router.get('/', AuthMiddleware_1.auth, UserController_1.default.getAll);
        this.router.post('/create', UserController_1.default.create);
        this.router.get('/:id', UserController_1.default.getById);
        this.router.put('/update/:id', UserController_1.default.updateById);
        this.router.delete('/delete/:id', UserController_1.default.deleteById);
    }
}
exports.default = new UserRouter().router;

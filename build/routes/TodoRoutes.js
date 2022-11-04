"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const TodoValidator_1 = __importDefault(require("../middlewares/TodoValidator"));
class TodoRouter extends BaseRoutes_1.default {
    routes() {
        this.router.get('/', AuthMiddleware_1.auth, TodoController_1.default.getAll);
        this.router.post('/create', AuthMiddleware_1.auth, TodoValidator_1.default, TodoController_1.default.create);
        this.router.get('/:id', AuthMiddleware_1.auth, TodoController_1.default.getById);
        this.router.put('/update/:id', AuthMiddleware_1.auth, TodoValidator_1.default, TodoController_1.default.updateById);
        this.router.delete('/delete/:id', AuthMiddleware_1.auth, TodoController_1.default.deleteById);
    }
}
exports.default = new TodoRouter().router;

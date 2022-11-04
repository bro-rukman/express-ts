"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/models');
class TodoService {
    constructor(req) {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield db.todo.findAll({
                where: { user_id: this.credential.id },
                attributes: { exclude: ['userId'] },
            });
            return data;
        });
        this.createData = () => __awaiter(this, void 0, void 0, function* () {
            const { description } = this.body;
            const data = yield db.todo.create({
                user_id: this.credential.id,
                description,
            });
            return data;
        });
        this.getDataById = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const data = yield db.todo.findOne({
                where: { id, user_id: this.credential.id },
                attributes: { exclude: ['userId'] },
            });
            return data;
        });
        this.updateDataById = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const { description } = this.body;
            const data = yield db.todo.update({ description }, { where: { id, user_id: this.credential.id } });
            return data;
        });
        this.deleteDataById = () => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.params;
            const data = yield db.todo.destroy({ where: { id, user_id: this.credential.id } });
            return data;
        });
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = TodoService;

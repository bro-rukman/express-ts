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
class TodoController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.app.locals.credential;
            const data = yield db.todo.findAll({
                where: { user_id: id },
                attributes: { exclude: ['userId'] },
            });
            return res.status(200).send({
                data,
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.app.locals.credential;
            const { description } = req.body;
            const todo = yield db.todo.create({
                user_id: id,
                description,
            });
            return res.status(201).send({
                data: todo,
                message: 'Create todo succeeded !',
            });
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.app.locals.credential;
            const { id } = req.params;
            const data = yield db.todo.findOne({
                where: { id, user_id },
                attributes: { exclude: ['userId'] },
            });
            if (!data) {
                return res.status(404).send({
                    message: 'Todo not found !',
                });
            }
            else {
                return res.status(200).send({
                    data,
                });
            }
        });
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.app.locals.credential;
            const { id } = req.params;
            const { description } = req.body;
            yield db.todo.update({ description }, { where: { id, user_id } });
            const getDataUpdate = yield db.todo.findOne({ where: { id, user_id }, attributes: { exclude: ['userId'] } });
            return res.status(200).send({
                data: getDataUpdate,
                message: 'Update data succeeded !',
            });
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.app.locals.credential;
            const { id } = req.params;
            const getTodoId = yield db.todo.findOne({ where: { id, user_id } });
            if (!getTodoId) {
                return res.status(404).send({ message: 'Data not found !' });
            }
            else {
                yield db.todo.destroy({ where: { id, user_id } });
                return res.status(200).send({ message: 'Data successfully deleted !' });
            }
        });
    }
}
exports.default = new TodoController();

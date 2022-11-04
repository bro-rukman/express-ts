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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/models');
const TodoService_1 = __importDefault(require("../services/TodoService"));
class TodoController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const service = new TodoService_1.default(req);
            const data = yield service.getAll();
            return res.status(200).send({
                data,
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const service = new TodoService_1.default(req);
            const todo = yield service.createData();
            return res.status(201).send({
                data: todo,
                message: 'Create todo succeeded !',
            });
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const service = new TodoService_1.default(req);
            const data = yield service.getDataById();
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
            const service = new TodoService_1.default(req);
            yield service.updateDataById();
            const getDataUpdate = yield service.getDataById();
            return res.status(200).send({
                data: getDataUpdate,
                message: 'Update data succeeded !',
            });
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const service = new TodoService_1.default(req);
            const getDataId = yield service.getDataById();
            if (!getDataId) {
                return res.status(404).send({ message: 'Data not found !' });
            }
            else {
                yield service.deleteDataById();
                return res.status(200).send({ message: 'Data successfully deleted !' });
            }
        });
    }
}
exports.default = new TodoController();

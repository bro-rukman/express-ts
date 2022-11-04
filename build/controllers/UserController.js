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
class UserController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUser = yield db.user.findAll({ attributes: { exclude: ['password'] } });
            return res.status(200).send({
                data: allUser,
            });
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield db.user.findOne({ where: { id }, attributes: { exclude: ['password'] } });
            if (!user) {
                return res.status(404).send('User not found !');
            }
            else {
                return res.status(200).send({ data: user });
            }
        });
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.app.locals.credential;
            const { username, password } = req.body;
            yield db.user.update({ username, password }, { where: { id }, attributes: { exclude: ['password'] } });
            const getDataUpdate = yield db.user.findOne({ where: { id }, attributes: { exclude: ['password'] } });
            return res.status(200).send({
                data: getDataUpdate,
                message: 'Success Update user !',
            });
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield db.user.findOne({ where: { id } });
            if (!user) {
                return res.status(404).send({ message: 'User not found !' });
            }
            yield db.user.destroy({ where: { id } });
            return res.status(200).send({ message: 'User successfully deleted !' });
        });
    }
}
exports.default = new UserController();

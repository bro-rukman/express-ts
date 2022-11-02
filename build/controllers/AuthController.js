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
const HashPassword_1 = __importDefault(require("../utils/HashPassword"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            const passwordHashed = yield HashPassword_1.default.hash(password);
            yield db.user.create({
                username,
                password: passwordHashed,
            });
            return res.status(200).send('Created user succeeded !');
        });
    }
    login(req, res) {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).send('Wrong username or password !');
        }
        return res.send('Login Succeeded !');
    }
}
exports.default = new AuthController();

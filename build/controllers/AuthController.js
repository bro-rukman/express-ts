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
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { username, password } = req.body;
            const passwordHashed = yield Authentication_1.default.passwordHash(password);
            yield db.user.create({
                username,
                password: passwordHashed,
            });
            return res.status(200).send('Created user succeeded !');
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const userFind = yield db.user.findOne({ where: { username } });
            let result = yield Authentication_1.default.passwordCompare(password, userFind === null || userFind === void 0 ? void 0 : userFind.password);
            if (result) {
                let token = Authentication_1.default.generateToken(userFind.id, username, password);
                return res.status(200).send({ username, token });
            }
            return res.send('Wrong username or password !');
        });
        this.profile = (req, res) => {
            return res.send(req.app.locals.credential);
        };
    }
}
exports.default = new AuthController();

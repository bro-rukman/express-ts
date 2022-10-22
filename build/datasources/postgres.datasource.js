"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pgp = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
dotenv_1.default.config();
const initOptions = {
    promiseLib: bluebird_1.default,
    extend(obj, dc) {
        obj.users = new user_repository_1.default(obj, exports.pgp);
    },
    query(e) {
        // tslint:disable-next-line:no-console
        console.log('CN:', e.query);
        // tslint:disable-next-line:no-console
        console.log('QUERY:', e.query);
    },
};
exports.pgp = (0, pg_promise_1.default)(initOptions);
const port = parseInt(process.env.PGPORT || '5432', 10);
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port,
};
exports.db = (0, exports.pgp)(config);
exports.default = { db: exports.db, pgp: exports.pgp };

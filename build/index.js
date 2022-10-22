"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send('Routing use TS');
        });
        this.app.route('/request').post((req, res) => {
            res.send(req.body);
        });
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log('Server running in port ' + port);
});

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
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const dotenv_1 = require("dotenv");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
        (0, dotenv_1.config)();
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
            res.send('This is default path');
        });
        this.app.use('/api/v1/user', UserRoutes_1.default);
        // this.app.use('/api/v1/auth', AuthRoutes);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log('Server running in port ' + port);
});

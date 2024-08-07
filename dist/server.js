"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const app = (0, express_1.default)();
const wss = new ws_1.default.Server({ port: 3000 });
app.use(express_1.default.static('templates'));
wss.on('connection', (ws) => {
    console.log("User connection");
    ws.on("message", (context) => {
        const msg = context.toString();
        console.log(msg);
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(msg);
            }
        });
    });
    ws.on("close", (context) => {
        console.log(`user was disconnect`);
    });
});
app.get("/", (req, res, next) => {
    let path = __dirname.split("src")[0];
    res.sendFile(path + 'templates/chat.html');
});
app.listen(3100, () => console.log(`Server is running on port:${3100}`));

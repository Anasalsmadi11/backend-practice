const logItems = require("./logEvents");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("log", (msg) => logItems(msg));

setTimeout(() => {
  myEmitter.emit("log", "you have logged new message!");
}, 2000);

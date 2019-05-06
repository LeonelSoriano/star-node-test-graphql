import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format:"YYYY-MM-DD:HH.mm.ss"}),
        winston.format.json()),
    transports: [new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/logfile.log" })]
});

export default logger;

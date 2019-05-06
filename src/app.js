import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import logger from "./until/logger";

import indexRouter from "./routes/index";

import models, { connectDb } from "./models/db";
import seed from "./seeders";
import graphqlStructure from "./graphql";



const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

var eraseDatabaseOnSync = true;


//logger.log("error", "it works!!");

connectDb()
    .then(async () => {
        if (eraseDatabaseOnSync) {
            await Promise.all([models.User.deleteMany({})]);

            //  createUsersWithMessages();
        }
        poblateDatabase();
        console.log("estas conectado");
    })
    .catch(e => {
        console.log(e);
    });

const poblateDatabase = async () => {
    for (let i = 0; i < seed.userSeed.length; i++) {
        let userItem = seed.userSeed[i];
        await new models.User({
            username: userItem.username,
            firstName: userItem.firstName,
            lastName: userItem.lastName
        }).save();
    }
};

graphqlStructure();

//console.log(verificateToken(generateJwt("hola")));

export default app;

"use strict";

import mongoose from "mongoose";

import User from "./user";

const connectDb = () => {
    return mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
};

const models = { User };

export { connectDb };

export default models;

"use strict";

import DefaultValues from "../../until/defaultValues";

export default class UserDto {
    constructor() {
        this.id = DefaultValues.NUMBER;
        this.username  = DefaultValues.STRING;
        this.firstName = DefaultValues.STRING;
        this.lastName = DefaultValues.STRING;
        this.token = DefaultValues.STRING;
    }

    toObject(values){
        if(typeof values !== "object"){
            return;
        }
        if(values._id !== undefined ){
            this.id = values._id;
        }

        if(values.firstName !== undefined){
            this.firstName = values.firstName;
        }

        if(values.lastName !== undefined){
            this.lastName = values.lastName;
        }

        if(values.username !== undefined){
            this.username = values.username;
        }

        if(values.token !== undefined){
            this.token = values.token;
        }
    }

    toJson(){
        let toObjectValues = {
            _id: this.id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName
        };
        return toObjectValues;
    }
}

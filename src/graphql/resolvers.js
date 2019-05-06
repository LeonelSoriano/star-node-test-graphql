"use strict";

import {UserCtr} from "controller/userCtr";

let count = 2;
let todos = [
    {
        id: "0",
        content: "Buy milk",
        isCompleted: true
    },
    {
        id: "1",
        content: "Cook some lobster",
        isCompleted: false
    }
];

const resolvers = {
    Query: {
        allTodos: () => {
            return todos;
        },
        Users: (_, args, context, info) => {
            console.log(_);
            console.log(context.token);
            return new UserCtr().listUser();
        },
        getUser: (_, { id }) => {
            return null;
        },
        Todo: (_, { id }) => {
            const todo = todos.find(x => x.id === id);
            if (!todo) {
                throw new Error("Cannot find your todo!");
            }
            return todo;
        }
    },
    Mutation: {
        createTodo: (_, { content, isCompleted }) => {
            const newTodo = {
                id: count++,
                content,
                isCompleted
            };
            todos = [...todos, newTodo];
            return newTodo;
        },
        updateTodo: (_, { id, content, isCompleted }) => {
            let updatedTodo;

            todos = todos.map(todo => {
                if (todo.id === id) {
                    updatedTodo = {
                        id: todo.id,
                        // for content and isCompleted, we first check if values are provided
                        content: content !== undefined ? content : todo.content,
                        isCompleted: isCompleted !== undefined ? isCompleted : todo.isCompleted
                    };
                    return updatedTodo;
                } else {
                    return todo;
                }
            });

            return updatedTodo;
        },
        deleteTodo: (_, { id }) => {
            const todoToDelete = todos.find(x => x.id === id);

            todos = todos.filter(todo => {
                return todo.id !== todoToDelete.id;
            });

            return todoToDelete;
        },

        deleteUser: (_, { id }) => {
            return "eliminado hols";
        }
    }
};

export default resolvers;

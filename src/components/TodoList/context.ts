// libs
import { createContext, useContext } from "react";

// types
import { TodoListContextState } from "./types";


const TodoListContext = createContext<TodoListContextState>({
    addTodo: () => void 0,
    getTodo: () => undefined,
    toggleTodo: () => void 0,
    disabled: false,
    completed: false
})

export const TodoListContextProvider =  TodoListContext.Provider
export const useTodoListContext = () => useContext(TodoListContext)


// libs
import React from 'react'
import { Box } from "@material-ui/core";

// types
import { TodoListFC } from "./types";

// components
import { TodoItem } from "./TodoItem";

// others
import { TodoListContextProvider } from "./context";
import { useTodoList } from "./useTodoList";

export const TodoList: TodoListFC = ({
     children,
     disabled ,
     onChange,
    onCompleted,
    onDisabled,
    onDirty,
    name
}) => {
    const [state, controls] = useTodoList(name, {
        onChange,
        onDisabled,
        onCompleted,
        onDirty,
        disabled
    })

    return (
        <TodoListContextProvider value={{
            addTodo: controls.addTodo,
            toggleTodo: controls.toggleTodo,
            getTodo: controls.getTodo,
            completed: state.completed,
            disabled: state.disabled
        }}>
            <Box display="flex" flexDirection="column">
                {children}
            </Box>
        </TodoListContextProvider>

    )
};

TodoList.Item = TodoItem

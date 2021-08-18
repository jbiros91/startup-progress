// libs
import React, { FC } from 'react';
import { Checkbox, FormControlLabel } from "@material-ui/core";

// types
import {TodoItemProps} from "./types";

// others
import { useTodoItem } from "./useTodoItem";

export const TodoItem: FC<TodoItemProps> = ({id, children}) => {
    const { todoItem, toggleTodo } = useTodoItem(id)

    return todoItem ? (
        <FormControlLabel
            control={
                <Checkbox checked={todoItem.checked} disabled={todoItem.disabled} onChange={() => {
                    toggleTodo(id)
                }} />
            }
            label={children}
        />
    ) : <></>
};

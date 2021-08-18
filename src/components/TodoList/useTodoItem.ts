// libs
import { useEffect, useMemo } from 'react'

// others
import { useTodoListContext } from "./context";

export const useTodoItem = (id: number) => {
    const { addTodo, toggleTodo, getTodo, disabled } = useTodoListContext()

    useEffect(() => {
        addTodo(id)
    }, [addTodo, id])

    const todo = getTodo(id);

    return {
        todoItem: useMemo(() => todo ? ({
                ...todo,
                disabled
            }) : null, [disabled, todo]),
        toggleTodo,
    }
}
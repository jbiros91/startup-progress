import { FC } from "react";
import { Action } from "../../types";


/**
 * useTodoList hooks types
 */

export enum TodoListActionType {
    ADD_TODO,
    TOGGLE_TODO,
    SET_DISABLED
}

export type TodoListActions =
    | Action<TodoListActionType.ADD_TODO, { id: number }>
    | Action<TodoListActionType.TOGGLE_TODO, { id: number }>
    | Action<TodoListActionType.SET_DISABLED, { disabled: boolean }>


interface TodoState {
    id:  number;
    checked: boolean;
}

export interface TodoListState {
    completed: boolean
    disabled: boolean
    dirty: boolean
    todos: TodoState[];
}

export type AddTodo = (id: number) => void
export type ToggleTodo = (id: number) => void
export type GetTodo = (id: number) => TodoState | undefined
export type SetDisabled = (disabled: boolean) => void

interface TodoListControls {
    addTodo: AddTodo
    toggleTodo: ToggleTodo
    getTodo: GetTodo
    setDisabled: SetDisabled
}

interface UseTodoListOptions {
    disabled?: boolean
    onChange?: (state: TodoListState, name: string) => void
    onCompleted?: (completed: boolean, name: string) => void
    onDisabled?: (disabled: boolean, name: string) => void
    onDirty?: (dirty: boolean, name: string) => void
}

export type UseTodoList = (name: string, options?: UseTodoListOptions) => [TodoListState, TodoListControls]

/**
 * Use todolist context types
 */
export interface TodoListContextState {
    addTodo: AddTodo
    toggleTodo: ToggleTodo
    getTodo: GetTodo
    completed: boolean
    disabled: boolean
}


/**
 * React component types
 */
export interface TodoListTitleProps {
    step: number
}
export interface TodoItemProps {
    id: number
}

export interface TodoListProps extends UseTodoListOptions {
    name: string
}
export interface TodoListFC extends FC<TodoListProps>{
    Item: FC<TodoItemProps>
}


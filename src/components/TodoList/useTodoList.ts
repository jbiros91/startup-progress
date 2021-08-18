// libs
import { Reducer, useCallback, useReducer, useEffect } from "react";

// types
import {
    TodoListState,
    TodoListActions,
    TodoListActionType,
    UseTodoList,
} from "./types";


const initialState: TodoListState ={
    // all todos are complete
    completed: false,
    // all todos are disabled
    disabled: false,
    // some todos are completed
    dirty: false,
    todos: []
}

const reducer: Reducer<TodoListState, TodoListActions> = (state, action) => {
    switch (action.type) {
        case TodoListActionType.ADD_TODO: {
            const todoExist = state.todos.find(todo => todo.id === action.payload.id)
            const newTodos = todoExist ? state.todos : [...state.todos, { id: action.payload.id, checked: false }]

            return {...state, todos: newTodos };
        }

        case TodoListActionType.TOGGLE_TODO:
            const newTodos = state.todos.map(todo => {
                return {
                    ...todo,
                    checked: action.payload.id === todo.id ? !todo.checked : todo.checked
                }
            })

            return {
                ...state,
                completed: newTodos.every(todo => todo.checked),
                dirty: newTodos.some(todo => todo.checked),
                todos: newTodos
            };

        case TodoListActionType.SET_DISABLED:
            return {...state, disabled: action.payload.disabled}

        default:
            return state;
    }
}

export const useTodoList: UseTodoList = (
    name,
    { onCompleted, onDisabled, onChange, onDirty, disabled = false} = {}
) => {
    const [state, dispatch] = useReducer(reducer, initialState, state => {
        const storedState = localStorage.getItem(name)
        return storedState ? JSON.parse(storedState) : {...state, disabled }
    })

    const addTodo = useCallback((id: number) => dispatch({type:TodoListActionType.ADD_TODO, payload: { id }}), [])
    const toggleTodo = useCallback((id: number) => dispatch({type:TodoListActionType.TOGGLE_TODO, payload: { id }}), [])
    const getTodo = useCallback((id: number) => state.todos.find(todo => todo.id === id), [state.todos])
    const setDisabled = useCallback((disabled: boolean) => dispatch({type:TodoListActionType.SET_DISABLED, payload: {disabled:disabled }}), [])

    useEffect(() => {
        if (onCompleted)
            onCompleted(state.completed, name)
    }, [name, onCompleted, state.completed])

    useEffect(() => {
        // every time disabled change change state
        setDisabled(disabled)

        if(onDisabled)
            onDisabled(state.disabled, name)
    }, [disabled, name, onDisabled, setDisabled, state.disabled])

    useEffect(() => {
        if(onDirty)
            onDirty(state.dirty, name)
    }, [name, onDirty, state.dirty])

    useEffect(() => {
        // on every state change store data to localstorage
        localStorage.setItem(name, JSON.stringify(state))
        
        if(onChange)
            onChange(state, name)
    }, [name, onChange, state])

    return [state, {
        addTodo,
        toggleTodo,
        getTodo,
        setDisabled
    }]
}
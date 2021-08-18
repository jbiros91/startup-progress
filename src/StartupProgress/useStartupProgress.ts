// libs
import { Reducer, useReducer, useCallback, useEffect } from "react";

// types
import {
    StartupProgressPhase,
    StartupProgressActions,
    StartupProgressState,
    StartupProgressType,
    UseStartupProgressOptions
} from "./types"


const reducer: Reducer<StartupProgressState, StartupProgressActions> = (state, action) => {
    switch (action.type) {
        case StartupProgressType.SET_COMPLETED: {
            const newPhases = {
                ...state.phases,
                [action.payload.phase]: {
                    ...state.phases[action.payload.phase],
                    completed: action.payload.completed
                }
            }

            return {
                ...state,
                completed: Object
                    .values(newPhases)
                    .map(phase => phase.completed)
                    .every(Boolean),
                phases: newPhases
            }
        }

        case StartupProgressType.SET_DIRTY: {
            const newPhases = {
                ...state.phases,
                [action.payload.phase]: {
                    ...state.phases[action.payload.phase],
                    dirty: action.payload.dirty
                }
            }


            return {...state, phases: newPhases }
        }
        default:
            return state
    }

}

export const useStartupProgress = ({ onCompleted }: UseStartupProgressOptions = {}) => {
    const [state, dispatch] = useReducer(
        reducer,
        { completed: false, phases: {} },
        state => ({
                ...state,
                phases: Object.values(StartupProgressPhase).reduce((state, currentType, index, array) => {
                        return {...state, [currentType]: {
                                nextPhase: array[index + 1],
                                previousPhase: array[index - 1],
                                completed: false,
                                dirty: false
                            }};
                    }, {})
            })
    )

    const setCompleted = useCallback((completed: boolean, phase: string) => {
        dispatch({type: StartupProgressType.SET_COMPLETED, payload: { phase, completed }})
    }, []);

    const setDirty = useCallback((dirty: boolean, phase: string) => {
        dispatch({type: StartupProgressType.SET_DIRTY, payload: { phase, dirty }})
    }, []);

    const isPhaseDisabled = useCallback((phase: string) => {
        const currentPhase = state.phases[phase];

        const isPreviousCompleted = state.phases[currentPhase.previousPhase]?.completed ?? true
        const isNextDirty = state.phases[currentPhase.nextPhase]?.dirty ?? false

        return !isPreviousCompleted || isNextDirty
    }, [state])


    useEffect(() => {
        if (onCompleted)
            onCompleted(state.completed)
    }, [onCompleted, state.completed])

    return {
        state,
        setCompleted,
        setDirty,
        isPhaseDisabled
    }
}
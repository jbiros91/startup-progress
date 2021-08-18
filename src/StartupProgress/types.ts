import { Action } from "../types";


// order is important
export enum StartupProgressPhase {
    FOUNDATION = 'foundation',
    DISCOVERY = 'discovery',
    DELIVERY = 'delivery'
}

/**
 * useStartupProgress types
 */
export enum StartupProgressType {
    SET_COMPLETED = 'setCompleted',
    SET_DIRTY = 'setDirty'
}

export type StartupProgressActions =
    | Action<StartupProgressType.SET_COMPLETED, { phase: string, completed: boolean }>
    | Action<StartupProgressType.SET_DIRTY, { phase: string, dirty: boolean }>

interface PhaseProgressState {
    nextPhase: string
    previousPhase: string
    completed: boolean
    dirty: boolean
}


export interface StartupProgressState {
    completed: boolean
    phases: {
        [key: string]: PhaseProgressState
    }
}

export interface UseStartupProgressOptions {
    onCompleted?: (completed: boolean) => void
}
export type StartupProgressProps = UseStartupProgressOptions



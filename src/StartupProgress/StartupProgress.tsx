// libs
import React, {FC} from 'react';
import { Box } from "@material-ui/core";

// types
import { StartupProgressPhase, StartupProgressProps } from "./types";

// components
import { TodoList, TodoListTitle } from "../components/TodoList";

// others
import { useStartupProgress } from "./useStartupProgress";


export const StartupProgress: FC<StartupProgressProps> = ({onCompleted}) => {
    const { setDirty, setCompleted, isPhaseDisabled } = useStartupProgress({ onCompleted })

    return (
        <Box display="flex" flexDirection="column">

            <TodoList
                name={StartupProgressPhase.FOUNDATION}
                onCompleted={setCompleted}
                onDirty={setDirty}
                disabled={isPhaseDisabled(StartupProgressPhase.FOUNDATION)}
            >
                <TodoListTitle step={1}>
                    Foundation
                </TodoListTitle>
                <TodoList.Item id={4}>
                    First TodoList
                </TodoList.Item>
                <TodoList.Item id={2}>
                    second TodoList
                </TodoList.Item>
                <TodoList.Item id={3}>
                    third TodoList
                </TodoList.Item>
            </TodoList>

            <TodoList
                name={StartupProgressPhase.DISCOVERY}
                onCompleted={setCompleted}
                onDirty={setDirty}
                disabled={isPhaseDisabled(StartupProgressPhase.DISCOVERY)}
            >
                <TodoListTitle step={2}>
                    Discovery
                </TodoListTitle>
                <TodoList.Item id={1}>
                    First TodoList
                </TodoList.Item>
                <TodoList.Item id={2}>
                    second TodoList
                </TodoList.Item>
                <TodoList.Item id={3}>
                    third TodoList
                </TodoList.Item>
            </TodoList>

            <TodoList
                name={StartupProgressPhase.DELIVERY}
                onCompleted={setCompleted}
                onDirty={setDirty}
                disabled={isPhaseDisabled(StartupProgressPhase.DELIVERY)}
            >
                <TodoListTitle step={3}>
                    Delivery
                </TodoListTitle>
                <TodoList.Item id={1}>
                    First TodoList
                </TodoList.Item>
                <TodoList.Item id={2}>
                    second TodoList
                </TodoList.Item>
                <TodoList.Item id={3}>
                    third TodoList
                </TodoList.Item>
            </TodoList>
        </Box>

    )
};

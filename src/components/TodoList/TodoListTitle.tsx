// libs
import React, { FC } from 'react';
import {Box} from "@material-ui/core";
import {Step} from "../Step";
import CheckIcon from "@material-ui/icons/Check";

// types
import { TodoListTitleProps } from "./types";

// others
import {useTodoListContext} from "./context";


export const TodoListTitle: FC<TodoListTitleProps> = ({children, step}) => {
    const { completed } = useTodoListContext()

    return (
        <Box display="flex" flexDirection="row" clone>
            <h1>
                <Step step={step} />
                <Box component="span" marginLeft="1rem">
                    {children}
                </Box>
                {
                    completed && (
                        <Box fontSize="2.5rem" marginLeft="1rem" clone>
                            <CheckIcon />
                        </Box>
                    )
                }
            </h1>
        </Box>
    )
};

// libs
import React, { FC } from 'react';
import { Box } from "@material-ui/core";

// types
import {StepProps} from "./types";

export const Step: FC<StepProps> = ({ step }) => (
    <Box
        display="flex"
        alignContent="center"
        justifyContent="center"
        borderRadius="50%"
        width="40px"
        height="40px"
        bgcolor="black"
        color="white"
    >
        {step}
    </Box>
)


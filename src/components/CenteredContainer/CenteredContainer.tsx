// libs
import React, { FC } from 'react';
import {Box} from "@material-ui/core";


export const CenteredContainer: FC = ({children}) => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
    >
        {children}
    </Box>
)

import React, {
    createContext, useMemo, useState
} from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';



export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode],
    );
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode,
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
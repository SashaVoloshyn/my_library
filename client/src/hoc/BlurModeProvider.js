import React, {
    createContext, useMemo, useState,
} from 'react';



export const AuthFormContext = createContext ({ handleBlurToggle: () => {}, triggerBlur: false });

export const BlurModeProvider = ({ children }) => {
    const [trigger, setTrigger] = useState(false);

    const handleBlurToggle = useMemo (() => ({
        handleBlurToggle: () => {
            trigger ? setTrigger(false) : setTrigger(true);
        },
        triggerBlur: trigger,
    }), [trigger]);

    return (
        <AuthFormContext.Provider value={handleBlurToggle}>
            { children }
        </AuthFormContext.Provider>
    );
};
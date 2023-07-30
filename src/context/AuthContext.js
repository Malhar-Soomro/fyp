import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ isNumber: false, firstName: "abc" }}>
            {children}
        </AuthContext.Provider>
    );
}
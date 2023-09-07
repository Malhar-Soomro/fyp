import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { TransactionProvider } from "./src/context/TransactionContext";

export const wrapRootElement = ({ element }) => (

    <AuthProvider>
        <TransactionProvider>
            {element}
        </TransactionProvider>
    </AuthProvider>
);

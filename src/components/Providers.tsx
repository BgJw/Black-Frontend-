'use client'

import { SessionProvider } from "next-auth/react";
import {ReactNode} from "react";
import { Provider } from "react-redux";
import store from "../store/store";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>   
        </SessionProvider>
    )
}
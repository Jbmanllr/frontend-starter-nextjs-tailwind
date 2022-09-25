import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ThemeProvider } from 'next-themes'
import { Layouts } from '../src/components'

//Style Imports
import "tailwindcss/tailwind.css";
import "@styles/global.css";

//Types Imports
import type { DehydratedState } from '@tanstack/react-query';
import type { NextPageContext } from 'next';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {

    const queryClient = new QueryClient();

    return (
        
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <ThemeProvider attribute="class">
                        <Layouts>
                            <Component {...pageProps} />
                        </Layouts>
                    </ThemeProvider>
                </Provider>
            </Hydrate>
        </QueryClientProvider>
        
    );
}

export default MyApp;

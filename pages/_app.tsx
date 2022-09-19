import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ThemeProvider } from 'next-themes'
import { Layouts } from '../src/components'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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

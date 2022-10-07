import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ThemeProvider } from 'next-themes'
import { Layouts } from '../src/components'
import NextCookies from 'next-cookies';
import { get } from 'lodash';
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import * as ToastPrimitive from '@radix-ui/react-toast';
import {Toast} from '@components';

//Style Imports
import "tailwindcss/tailwind.css";
import "@styles/global.css";

//Types Imports
import type { DehydratedState } from '@tanstack/react-query';
import type { NextPageContext } from 'next';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {

    const queryClient = new QueryClient();

    return (
        <ToastPrimitive.Provider label='Notifications' swipeDirection="right">
            <Toast />
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <ThemeProvider attribute="class">
                            <Layouts>
                                <DefaultSeo {...SEO} />
                                <Component {...pageProps} />
                            </Layouts>
                        </ThemeProvider>
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
            <ToastPrimitive.Viewport className="fixed top-5 right-5 z-[100]"/>
        </ToastPrimitive.Provider>
        
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;

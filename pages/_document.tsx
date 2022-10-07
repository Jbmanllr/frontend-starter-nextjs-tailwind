import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className={`theme-2`}>
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
      </Head>
      <body className={`site-background overflow-x-hidden transition-colors duration-200`}> 
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark">
      <Head />
      <body className="site-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
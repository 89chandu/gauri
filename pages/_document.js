import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    {process.env.NEXT_PWA_STATUS === 1 || process.env.NEXT_PWA_STATUS === '1'   && (<link rel="manifest" href="/manifest.json" />)}
                    {/*<link rel="apple-touch-icon" href="/icon.png"></link>*/}
                    <meta name="theme-color" content="#fff" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
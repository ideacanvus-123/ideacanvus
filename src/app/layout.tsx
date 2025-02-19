import './globals.css'
import './media_screen.css'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'
import Head from 'next/head'

export default function RootLayout({  
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Idea Canvas - Your Trusted IT Solutions Provider</title>
        <meta name="description" content="Idea Canvas specializes in innovative IT solutions, cloud computing, and digital transformation strategies." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" type="image/x-icon" href="/images/icon.jpg" />
        <link href="/css/all.min.css" rel="stylesheet" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />
      </head>
      
      <body>
        {children}
        
        {/* Load JavaScript files */}
        <Script type="module" src="/js/custom.js" strategy="lazyOnload" />
        <Script src="https://js.stripe.com/v3/" strategy="afterInteractive" />
      </body>
    </html>
  )
}

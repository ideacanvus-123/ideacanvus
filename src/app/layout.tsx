import './globals.css'
import './media_screen.css'
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script'

export default function RootLayout({  
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>PetDagogy - Your Trusted Pet Care Platform</title>
          <meta name="description" content="PetDagogy offers reliable pet care services, appointments, and personalized pet management for dogs, cats, and more. Visit us today!" />
          <meta name="robots" content="index, follow" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta content="" name="keywords" />
          <meta content="" name="deScription" />
          <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
          <link href="/css/all.min.css" rel="stylesheet" />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="preconnect" href="https://images.unsplash.com" />

          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />

          
        </head>
        <body>
          {children}
        </body>
        <Script type="module" src="/js/custom.js" strategy="lazyOnload"></Script>
        <script src="https://js.stripe.com/v3/"></script>
      </html>
    
  )
}

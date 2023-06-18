import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
                <script src="https://accounts.google.com/gsi/client" async defer></script>
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}

      </body>
    </Html>
  )
}

import './globals.css'

export const metadata = {
  title: 'JAN3',
  description: 'Accelerating Hyperbitcoinization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

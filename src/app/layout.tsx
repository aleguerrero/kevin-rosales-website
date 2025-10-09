import Header from "./Components/Header";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../public/GT-Super-Display-Regular-Trial.otf',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="h-dvh">
        <img src={"/blueprint.jpg"} className="fixed w-dvh h-dvh object-cover opacity-70"></img>
        <Header />
        <main className="relative pt-16 w-full h-full">{children}</main>
      </body>
    </html>
  );
}

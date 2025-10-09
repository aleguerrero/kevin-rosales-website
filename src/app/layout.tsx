import Header from "./Components/Header";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../public/GT-Super-Display-Regular-Trial.otf',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="min-h-dvh text-white">
        <img src={"/blueprint.jpg"} className="fixed w-full h-dvh object-cover opacity-90"></img>
        <Header />
        <main className="relative pt-16">{children}</main>
      </body>
    </html>
  );
}

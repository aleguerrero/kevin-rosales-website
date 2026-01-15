import Header from "./Components/Header";
import "./globals.css";
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../public/GT-Super-Display-Regular-Trial.otf',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <img src={"/blueprint.jpg"} className="fixed w-full h-full object-cover opacity-90"></img>
        <Header />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

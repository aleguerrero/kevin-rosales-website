import Header from "./Components/Header";
import "./globals.css";
import localFont from 'next/font/local'

export const metadata = {
  icons: {
    icon: '/kevinicon.svg', // Reference from the /public folder
    apple: '/kevinicon.svg',
  },
};

const mainFont = localFont({
  src: '/../../public/OverusedGrotesk-VF.woff2'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} max-md:text-xl text-3xl font-semibold bg-black w-full`}>
        <Header />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

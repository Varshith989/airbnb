import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/navbar/Navbar"
import RegisterModal from "@/components/modals/RegisterModal"
import LoginModal from "@/components/modals/LoginModal"
import RentModal from "@/components/modals/RentModal"
import SearchModal from "@/components/modals/SearchModal"
import ToasterProvider from "@/components/providers/ToasterProvider"
import getCurrentUser from "@/app/actions/getCurrentUser"

const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Airbnb | Holiday Rentals, Cabins, Beach Houses & More",
  description: "Airbnb clone built with Next.js App Router, Tailwind CSS, Prisma and NextAuth",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-48">
          {children}
        </div>
      </body>
    </html>
  )
}

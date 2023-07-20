import {ClientOnly, LoginModal, Navbar, RegisterModal, RentModal, SearchModal} from '@/app/components'
import './globals.css'
import { Nunito } from 'next/font/google'
import {ToasterProvider} from '@/app/providers'
import {getCurrentUser} from '@/app/actions'
import Footer from './components/navbar/Footer'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-24">
            {children}
          </div>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  )
}

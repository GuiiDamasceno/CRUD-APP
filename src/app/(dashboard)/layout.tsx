import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AuthProvider } from '@/contexts/auth-provider'
import { UserProfile } from '@/contexts/user-profile-provider'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-gray-100 w-full`}
      >
        <AuthProvider>
          <UserProfile>
            <SidebarProvider>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <main>{children}</main>
            </SidebarProvider>
          </UserProfile>
        </AuthProvider>
      </body>
    </html>
  )
}

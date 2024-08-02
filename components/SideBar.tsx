"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = ({ user }: SiderbarProps) => {

   const pathname = usePathname();
   return (
      <section className='sidebar'>
         <nav className='flex flex-col gap-4'>
            <Link href='/'
               className='mb-8 cursor-pointer flex item-center gap-2'>
               <Image
                  src="/icons/circle.svg"
                  width={34}
                  height={44}
                  alt="Horizon logo"
                  className='size-[34px] mt-1 max-xl:size-14' />
               <h1 className='concert-one-regular'>Circle</h1>
            </Link>
            {sidebarLinks.map((item) => {
               const isActive =
                  pathname === item.route || pathname.startsWith(`${item.route}/`)
               return (
                  <Link href={item.route}
                     key={item.label}
                     className={cn('sidebar-link', {
                        'bg-bank-gradient': isActive
                     })}>
                     <div className='relative size-6 '>
                        <Image
                           src={item.imgURL}
                           alt={item.label}
                           fill
                           className={cn({
                              'brightness- [3] invert-0': isActive
                           })}
                        />
                     </div>
                     <p className={cn(
                        'sidebar-label', {
                        '!text-white w-40': isActive
                     }
                     )}>{item.label}</p>
                  </Link>
               )
            })}
            <PlaidLink user={user} />
         </nav>
         <Footer user={user} type='desktop' />
      </section>
   )
}
export default SideBar

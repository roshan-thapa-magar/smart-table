import React from 'react'
import UserAvatar from '../UserAvatar'
import Image from 'next/image'
import Link from 'next/link'
import NotificationSheet from './NotificationSheet'
import BagSheet from './BagSheet'

export default function Header() {
    return (
        <header className="w-full shadow-sm">
            <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 md:w-11 md:h-11 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <Image
                                src="/logo.jpg"
                                alt="KYIRMU logo"
                                fill
                                sizes="40px"
                                className="object-contain rounded-full ring-2 ring-white/20 group-hover:ring-amber-500/50 transition-all duration-300"
                                priority
                            />
                        </div>

                        <h1 className="text-lg md:text-2xl font-extrabold">
                            SMART TABLE
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <NotificationSheet />
                    <BagSheet />
                    <UserAvatar />
                </div>
            </div>
        </header>
    )
}

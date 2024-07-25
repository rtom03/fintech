import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Copy from './Copy'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const BankCard = async ({ account, showBalance = true }: CreditCardProps

) => {

  const loggedIn = await getLoggedInUser()

  return (
    <div className='flex flex-col'>
      <Link href={`/transaction-history/?id=${account.appwriteItemId}`} className='bank-card'>
        <div className='bank-card_content'>
          <div >
            <h1 className='text-16 font-semibold text-white'>
              {/* {`${loggedIn?.firstName} ${loggedIn.lastName}`} */}
              {account.name}
            </h1>
            <p className='font-ibm-plex-serif font-black'>
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className='flex flex-col'>
            <div className='flex justify-between gap-4'>
              <h1 className='text-12 font-semibold text-white'>
                {/* {`${loggedIn?.firstName} ${loggedIn.lastName}`} */}
                {account.name}
              </h1>
              <h2 className='text-12 font-semibold text-white'>
                ●● / ●●
              </h2>
            </div>
            <div className='flex gap-3'>
              <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                ●●●● ●●●● ●●●●
              </p>
              <span className='text-14 text-white'>{account?.mask}</span>
            </div>
          </article>
        </div>
        <div className='bank-card_icon'>
          <Image
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="pay"
            className='mr-3'
          />
          <Image
            src="/icons/mastercard.svg"
            width={35}
            height={32}
            alt="mastercard"
            className='ml-5'
          />
        </div>
        <Image
          src="/icons/lines.png"
          width={10}
          height={5}
          alt="lines"
        />

      </Link>
      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  )
}

export default BankCard

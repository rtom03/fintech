import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const Transaction = () => {
  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='Payment Transfer'
        subtext='Please provide any specific details or notes related to the payment transfer '
      />
      <section className='size-ful pt-5'></section>
    </section>
  )
}

export default Transaction

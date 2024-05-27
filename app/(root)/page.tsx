import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedIn = { firstName: 'Garland',
  lastName:'Thompson',email:'rtom@gmail.com'}
  return (
    <div>
      <section className='home'>
          <div className='home-content'>
            <header className='home-header'>
            <HeaderBox 
            type="greeting"
            title='Welcome'
            user={loggedIn.firstName || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
            />
            <TotalBalanceBox
            accounts={[]} 
            totalBanks={1}
            totalCurrentBalance={1250.35}
            />
            </header>


          </div>
          <RightSideBar user={loggedIn}
          transactions={[]}
          banks={[{currentBalance:100.20},{currentBalance:10200.30}]}
          />
      </section>
    </div>
  )
}

export default Home


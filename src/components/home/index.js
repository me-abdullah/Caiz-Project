import React, { useEffect } from 'react'
import ButtonSection from './body'
import Header from './header'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className=''>
        <Header />
        <ButtonSection />
    </div>
  )
}

export default Home
import React from 'react'
import Banner from '../components/Banner'
import Contact from '../components/Contact'
import Features from '../components/Features'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>
        <Helmet>
        <title>LIFE-DROP | HOME</title>
    </Helmet>
      <Banner />
      <Features />
      <Contact />
    </>
  )
}

export default Home

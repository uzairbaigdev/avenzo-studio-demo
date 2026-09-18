import React, { useState, useEffect } from 'react'
import Navigation from '../../components/navigation/navigation.jsx'
import FirstSection from '../../components/homeComponents/firstSection.jsx'
import SecondSection from '../../components/homeComponents/secondSection.jsx'
import ThirdSection from '../../components/homeComponents/thirdSection.jsx'
import FourthSection from '../../components/homeComponents/fourthSection.jsx'
import FifthSection from '../../components/homeComponents/fifthSection.jsx'
import SixthSection from '../../components/homeComponents/sixthSection.jsx'
import Loader from '../../components/loader/loader.jsx'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading Home Page...
            </p>
          </div>
        </div>
        <Navigation />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
    </>
  )
}

export default Home
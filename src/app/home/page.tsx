import fetchUser from '@/app/user/fetchUser'
import Nav from '../_components/common/Nav'
import HomeSection from './_components/HomeSection'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Home = async () => {
  const user = await fetchUser()

  return (
    <>
      <Suspense fallback={<div>가져오는즁.,...</div>}>
        <HomeSection />
      </Suspense>
      <Nav />
    </>
  )
}

export default Home

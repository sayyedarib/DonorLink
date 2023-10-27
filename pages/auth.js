import SignUp from '@/components/SignUp'
import React from 'react'
import { useRouter } from 'next/router'
const Auth = () => {
  const router = useRouter();
  const { register } = router.query;
  return (
    <>
      <SignUp />
    </>
  )
}

export default Auth
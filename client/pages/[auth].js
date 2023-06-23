import AuthPopup from '@/components/AuthPopup'
import React from 'react'
import { useRouter } from 'next/router'
const signUpAndLogin = () => {
 const router = useRouter();
 const signUp = router.signUp.auth;
  return (
    <>
      <AuthPopup auth={signUp}/>
    </>
  )
}

export default signUpAndLogin
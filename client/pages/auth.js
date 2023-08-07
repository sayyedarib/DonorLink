import AuthPopup from '@/components/AuthPopup'
import React from 'react'
import { useRouter } from 'next/router'
const Auth = () => {
  const router = useRouter();
  const { register } = router.query;
  return (
    <>
      <AuthPopup auth={register} />
    </>
  )
}

export default Auth
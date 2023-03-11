import React,{useRef} from 'react'
import { useRouter } from 'next/router'

const paymentSuccess = () => {
const router = useRouter();

    const {reference} = router.query;
    console.log(reference)
  return (<>

    <div>paymentSuccess</div>
{reference}
  </>
  )
}

export default paymentSuccess
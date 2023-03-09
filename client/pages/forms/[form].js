import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navigation';
import ClothDonationForm from '@/components/Forms/ClothDonationForm';
import VolunteerForm from '@/components/Forms/VolunteerForm';

const Form = () => {
  const router = useRouter();
  const {form}=router.query;
    return (
    <>
    <Navbar/>
    {form=="clothDonation"&&
    <ClothDonationForm/>
    } 
    {form=="volunteerRegistration"&&
    <VolunteerForm/>
    } 
    </>
  )
}

export default Form

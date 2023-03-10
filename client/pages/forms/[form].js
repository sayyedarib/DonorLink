import React from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navigation';
import ClothDonationForm from '@/components/Forms/ClothDonationForm';
import VolunteerForm from '@/components/Forms/VolunteerForm';
import FoodDonation from '@/components/Forms/FoodDonationform';
import BloodDonation from '@/components/Forms/BloodDonationForm';

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
     {form=="foodDonation"&&
    <FoodDonation/>
    }
  {form=="bloodDonation"&&
    <BloodDonation/>
    }
    </>
  )
}

export default Form

import React from 'react'
import { useRouter } from 'next/router'
import ClothDonationForm from '@/components/Forms/ClothDonationForm';
import VolunteerForm from '@/components/Forms/VolunteerForm';
import FoodDonation from '@/components/Forms/FoodDonationform';
import BloodDonation from '@/components/Forms/BloodDonationForm';

const Form = () => {
  const router = useRouter();
  
  const { form } = router.query;
  return (
    <>
      <div className='h-[85vh] flex flex-col items-center justify-center'>
        {form == "clothDonation" &&
          <div>
            <ClothDonationForm />
          </div>

        }
        {form == "volunteerRegistration" &&
          <div>
            <VolunteerForm />
          </div>

        }
        {form == "foodDonation" &&
          <div>
            <FoodDonation />
          </div>

        }
        {form == "bloodDonation" &&
          <div>
            <BloodDonation />
          </div>
        }

      </div>
    </>
  )
}

export default Form;

import {
  FaFileAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";

import { AiOutlineReload } from "react-icons/ai";
import { MdFastfood, MdBloodtype } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";

const gradient = "url(#blue-gradient)";

const provideHelpService = [
  {
    id: 1,
    icon: <MdFastfood />,
    title: "Donate food",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/FoodDonation",
  },
  {
    id: 2,
    icon: <GiClothes />,
    title: "Donate Cloths",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/ClothDonation",
  },
  {
    id: 3,
    icon: <MdBloodtype />,
    title: "Donate Blood",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/DonateBlood",
  },
];

const getHelpService = [
  {
    id: 1,
    icon: <BiDonateBlood />,
    title: "Get Blood",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/GetBlood",
  },
  {
    id: 2,
    icon: <FaRupeeSign />,
    title: "Get Money",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/NeedMoney",
  },
  {
    id: 2,
    icon: <FaRupeeSign />,
    title: "Get Organ",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/NeedMoney",
  },
];

const volunteers = [
  {
    id: 1,
    name: "Areeb Hasasan Khan",
    email: "areebhasankhan@321.gmail.com",
    // img: "images.customer_img_2",
    bio: "hello how are you , i'm fine how about you",
  },
  {
    id: 2,
    name: "Rafey Ahamad",
    email: "rafeyahamd4321@gmail.com",
    // img: "images.customer_img_2",
    bio: "hello how are you , i'm fine how about you",
  },
  {
    id: 2,
    name: "Sayyed Arib Hussain",
    email: "sayyedaribhussain4321@gmail.com",
    // img: "images.customer_img_2",
    bio: "hello how are you , i'm fine how about you",
  },
];

const data = { provideHelpService, getHelpService, volunteers };

export default data;

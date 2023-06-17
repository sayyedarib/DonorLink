
import { BiDonateBlood } from "react-icons/bi";

import { MdFastfood} from "react-icons/md";
import { GiClothes,GiHeartOrgan } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";

const gradient = "url(#blue-gradient)";

const provideHelpService = [
  {
    id: 1,
    icon: <MdFastfood />,
    title: "Donate food",
    text: "When we donate food, we give people more than just sustenance. We give them hope and a reminder that they are not alone",
    link: "/forms/foodDonation",
  },
  {
    id: 2,
    icon: <GiClothes />,
    title: "Donate Cloths",
    text: "Donating clothes is not just about giving away what you don't need. It's about giving someone else the chance to feel loved, cared for, and dignified",
    link: "/forms/clothDonation",
  }
];

const getHelpService = [
  {
    id: 4,
    icon: <BiDonateBlood />,
    title: "Get Blood",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/GetBlood",
  },
  {
    id: 5,
    icon: <FaRupeeSign />,
    title: "Get Money",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/NeedMoney",
  },
  {
    id: 6,
    icon: <GiHeartOrgan />,
    title: "Get Organ",
    text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
    link: "/donation/NeedMoney",
  },
];


const data = { provideHelpService, getHelpService};

export default data;

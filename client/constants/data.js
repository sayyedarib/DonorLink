
import { BiDonateBlood } from "react-icons/bi";

import { MdFastfood} from "react-icons/md";
import { GiClothes,GiHeartOrgan } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";

const gradient = "url(#blue-gradient)";

const provideHelpService = [
  {
    id: 1,
    icon: <GiClothes />,
    title: "Donate Cloths",
    text: "Donating clothes is not just about giving away what you don't need. It's about giving needy a chance to feel that they have someone who cares about their need",
    link: "/forms/clothDonation",
  },
  {
    id: 2,
    icon: <BiDonateBlood />,
    title: "Donate Blood",
    text: " A single act of giving, a drop of life, can bridge the gap between despair and hope. Donate blood, ignite the flame of compassion, and be the lifeline that saves lives",
    link: "/forms/bloodDonation",
  }
];

const getHelpService = [
  {
    id: 4,
    icon: <BiDonateBlood />,
    title: "Get Blood",
    text: "Simply submit your blood request detailing your specific needs, and let our dedicated community of donors come to your aid. You'll find us as your lifeline in critical times",
    link: "/GetBlood",
  },
  // {
  //   id: 5,
  //   icon: <FaRupeeSign />,
  //   title: "Get Money",
  //   text: "Lorem ipsum dolor sit mattis amet consectetur adipiscing",
  //   link: "/donation/NeedMoney",
  // },
  {
    id: 6,
    icon: <GiClothes />,
    title: "Get Cloth",
    text: "Whether it's for personal use, community support, or charitable cause, simply submit your request. Compassionate network of donors is ready to lend helping hand.",
    link: "/GetCloth",
  },
];


const data = { provideHelpService, getHelpService};

export default data;

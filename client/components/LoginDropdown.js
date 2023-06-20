import { useState, useEffect, useRef } from "react";
import styles from "../styles/components/dropdownCard.module.css";

const DropdownCard = ({ options, onItemClick }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside the dropdown card, close it
      setPosition({ top: 0, left: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (option) => {
    onItemClick(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdownCard}
      style={{ top: position.top, left: position.left }}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className={styles.dropdownOption}
          onClick={() => handleItemClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default DropdownCard;

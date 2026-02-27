 // src/components/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";
import "@/css/03-layouts/header.css";

type HeaderProps = {
  
  title: string;
  
  onBack?: () => void;
  /** Optional custom handler; defaults to navigate("/") */
  onHome?: () => void;
  /** Make header sticky at the top */
  sticky?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, onBack, onHome, sticky = false }) => {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));
  const handleHome = onHome ?? (() => navigate("/"));

  return (
    <header className={`page-header ${sticky ? "is-sticky" : ""}`} role="banner">
      <button className="icon-btn" aria-label="Back" onClick={handleBack}>
        <ArrowLeftIcon width={24} height={24} />
      </button>

      <h1 className="page-title">{title}</h1>

      <button className="icon-btn" aria-label="Home" onClick={handleHome}>
        <HomeIcon width={24} height={24} />
      </button>
    </header>
  );
};

export default Header;
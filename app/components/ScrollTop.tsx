"use client";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <IconButton
        onClick={scrollTop}
        className="!bg-blue-500 hover:bg-blue-700 text-white shadow-lg transition-transform hover:scale-110"
        size="large"
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </div>
  );
};

export default ScrollToTop;

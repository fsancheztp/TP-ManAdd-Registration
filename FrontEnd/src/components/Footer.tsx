"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "@/css/03-layouts/footer.css"; // ← corporate stylesheet

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <footer className={cn("corp-footer", className)} {...props}>
      <p className="corp-footer__text">
        Tetra Pak PlantMaster | Manual Addition Registration
      </p>
      <span className="corp-footer__meta">2025 - Tetra Pak</span>
    </footer>
  );
};

export default Footer;
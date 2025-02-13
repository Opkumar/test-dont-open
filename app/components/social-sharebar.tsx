"use client";
import { Facebook, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/people/PRASK-Associates-Chartered-Accountants/61572661142607/",
    bgColor: "bg-[#3b5998]",
    label: "Share on Facebook",
  },
  {
    icon: "/assets/x_logo.png",
    href: "https://x.com/PRASK_CA",
    bgColor: "bg-black",
    label: "Share on X",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/prask-associates/",
    bgColor: "bg-[#0e76a8]",
    label: "Share on LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:prask@info.in",
    bgColor: "bg-[#c4302b]",
    label: "Send a mail",
  },
];

export default function SocialShareBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`
      fixed z-50
      ${isMobile
          ? "bottom-0 left-0 right-0 bg-white shadow-lg"
          : "left-0 top-1/2 -translate-y-1/2"
        }
    `}
    >
      <div
        className={`
        flex
        ${isMobile ? "flex-row justify-around py-2" : "flex-col"}
      `}
      >
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${social.bgColor} 
              ${isMobile ? "rounded-full mx-1" : "hover:translate-x-1"}
              text-white 
              transition-transform duration-200
              hover:scale-110
            `}
          >
            {typeof social.icon === "string" ? (
              // Render the custom image if the icon is a string (path to the image)
              <img
                src={social.icon}
                alt={social.label}
                className={`
                  object-cover h-10 w-10
                `}
              />
            ) : (
              // Render the Lucide icon if the icon is a component
              <social.icon
                className={`
                  ${isMobile ? "h-6 w-6 m-2" : "m-3 h-5 w-5"}
                `}
              />
            )}
            <span className="sr-only">{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

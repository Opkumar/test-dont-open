"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Team" },
  {
    label: "Services",
    dropdown: [
      {
        href: "/services/financial-and-accounting-services",
        label: "Financial & Accounting Services",
      },
      {
        href: "/services/risk-consulting-services",
        label: "Risk Consulting Services",
      },
      {
        href: "/services/virtual-cfo-services",
        label: "Virtual CFO Services",
      },
      {
        href: "/services/management-consultancy",
        label: "Management Consultancy",
      },
      {
        href: "/services/registrations",
        label: "Registrations",
      },
      {
        href: "/services/tax-advisory-services",
        label: "Tax Advisory Services",
      },
      {
        href: "/services/audit-&-compliance",
        label: "Audit & Compliance",
      },
      {
        href: "/services/offshore-accounting-services",
        label: "Offshore Accounting Services",
      },

      // {
      //   href: "/services/foreign-bookkeeping-services",
      //   label: "Foreign Bookkeeping Services",
      // },
    ],
  },
  { href: "/imp-dates", label: "Imp Dates" },
  {
    label: "Publications",
    href: "/publications",
  },
  {
    label: "Knowledge Bank",
    dropdown: [
      {
        label: "Calculators",
        submenu: [
          { href: "/knowledge-bank/calculator/gst", label: "GST" },
          {
            href: "/knowledge-bank/calculator/income-tax",
            label: "Income Tax",
          },
          { href: "/knowledge-bank/calculator/tds", label: "TDS" },
        ],
      },
    ],
  },
  { href: "/query", label: "Query" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDetails, setOpenDetails] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 max-w-full ${isScrolled || pathname !== "/" ? "bg-gray-950" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <motion.img
              src="/assets/main-logo.png"
              alt="PRASK & Associates Logo"
              className="h-12"
              whileHover={{ scale: 1.05 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-6">
              {NAV_ITEMS.map((item, index) => (
                <li key={index} className="relative group">
                  {item.dropdown ? (
                    <>
                      <span className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium cursor-pointer inline-flex items-center">
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      </span>
                      <ul className="absolute left-0 top-full bg-gray-700/90 backdrop-blur-sm p-2 min-w-[200px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {item.dropdown.map((subItem, subIndex) =>
                          subItem.submenu ? (
                            <li
                              key={subIndex}
                              className="relative group/submenu"
                            >
                              <span className="block text-white hover:text-orange-400 px-4 py-2 cursor-pointer inline-flex items-center justify-between w-full">
                                {subItem.label}
                                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 -rotate-90 group-hover/submenu:rotate-0" />
                              </span>
                              <ul className="absolute left-full top-0 bg-gray-700/90 backdrop-blur-sm p-2 min-w-[200px] invisible group-hover/submenu:visible opacity-0 group-hover/submenu:opacity-100 transition-all duration-300">
                                {subItem.submenu.map(
                                  (subMenuItem, subMenuIndex) => (
                                    <li key={subMenuIndex}>
                                      <Link
                                        href={subMenuItem.href}
                                        className="block text-white hover:text-orange-400 px-4 py-2"
                                      >
                                        {subMenuItem.label}
                                      </Link>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </li>
                          ) : (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href}
                                className="block text-white hover:text-orange-400 px-4 py-2"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gray-950 p-0">
                <div className="h-full bg-gray-950 text-white p-6">
                  <div className="flex flex-col space-y-6">
                    {NAV_ITEMS.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-800 pb-2"
                      >
                        {item.dropdown ? (
                          <details
                            open={openDetails === item.label}
                            onToggle={(e) => {
                              if (e.currentTarget.open) {
                                setOpenDetails(item.label);
                              } else {
                                setOpenDetails("");
                              }
                            }}
                          >
                            <summary className="text-white hover:text-orange-400 cursor-pointer flex items-center justify-between">
                              {item.label}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${openDetails === item.label ? "rotate-180" : ""
                                  }`}
                              />
                            </summary>
                            <ul className="pl-4 mt-2 space-y-2">
                              {item.dropdown.map((subItem, subIndex) =>
                                subItem.submenu ? (
                                  <li key={subIndex}>
                                    <details>
                                      <summary className="text-white hover:text-orange-400 cursor-pointer text-sm flex items-center justify-between">
                                        {subItem.label}
                                        <ChevronDown className="h-4 w-4" />
                                      </summary>
                                      <ul className="pl-4 mt-2 space-y-2">
                                        {subItem.submenu.map(
                                          (subMenuItem, subMenuIndex) => (
                                            <li key={subMenuIndex}>
                                              <Link
                                                href={subMenuItem.href}
                                                className="text-white hover:text-orange-400 text-sm"
                                              >
                                                {subMenuItem.label}
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </details>
                                  </li>
                                ) : (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href}
                                      className="text-white hover:text-orange-400 text-sm"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          </details>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-white hover:text-orange-400"
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

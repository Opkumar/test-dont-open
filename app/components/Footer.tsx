import Link from "next/link";
import { Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const services = [
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
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/people/PRASK-Associates-Chartered-Accountants/61572661142607/",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://www.linkedin.com/company/prask-associates/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://x.com/PRASK_CA",
      icon: "/assets/x_logo.png",
      label: "X",
    },
  ];

  const contactNumbers = [
    {
      name: "CA Rahul Paul",
      phone: "+91 9999393126",
    },
    {
      name: "CA Prabhjot Singh",
      phone: "+91 9599928202",
    },
    {
      name: "CA Sumit Kapoor",
      phone: "+91 9999137533",
    },
  ];

  return (
    <footer className="bg-gray-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase">
              PRASK & Associates
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 leading-relaxed">
                We are a leading chartered accountancy firm providing
                comprehensive financial solutions and advisory services.
              </p>
              <div>
                <h4 className="text-base font-medium mb-3 text-white">
                  Follow Us On
                </h4>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-600 hover:bg-gray-500 rounded-full transition-colors duration-300 group"
                    >
                      {typeof social.icon === "string" ? (
                        // Render the custom image if the icon is a string (path to the image)
                        <img
                          src={social.icon}
                          alt={social.label}
                          className="h-7 w-7 object-cover m-1.5"
                        />
                      ) : (
                        // Render the Lucide icon if the icon is a component
                        <social.icon className="h-5 w-5 m-2.5 text-gray-300 group-hover:text-white" />
                      )}
                      <span className="sr-only">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">New Delhi, India</p>
            {contactNumbers.map((contact, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-400">{contact.name}</p>
                <p className="text-gray-400">{contact.phone}</p>
              </div>
            ))}
            <p className="text-gray-400 mt-4">Email: info@prask.in</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} PRASK & Associates. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

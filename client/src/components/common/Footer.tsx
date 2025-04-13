import { FiMail, FiPhone, FiMapPin, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router';
import PrimaryBtn from "./PrimaryBtn";

export default function Footer() {
  return (
    <footer className="w-[80%] text-white py-i-lg">
      <div className="w-full max-w-[1200px] mx-auto px-i-14 py-i-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium">Urbanaid<span className="text-accent">.</span></h2>
            <p className="text-[13px] text-primary-50">
              Connecting local service providers with customers in need of their expertise.
            </p>
            <div className="flex flex-col gap-5 mt-i-10">
              <div className="flex items-center gap-3 text-sm">
                <FiMail className="" size={16} />
                <a href="mailto:contact@urbanaid.com" className="hover:text-accent text-white no-underline text-xs">
                  contact@urbanaid.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="" size={16} />
                <a href="tel:(123)456-7890" className="hover:text-accent transition-colors text-xs">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <FiMapPin className="mt-1" size={16} />
                <address className="not-italic font-medium text-xs">123 Service Street, City, State 12345</address>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-white">Quick Links</h3>
            <ul className="flex flex-col">
              {[
                { name: "Home", href: "/" },
                { name: "About us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Providers", href: "/providers" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-xs hover:text-accent transition-colors"
                  >
                    <FiChevronRight className="text-accent" size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-white">Services</h3>
            <ul className="flex flex-col">
              {[
                { name: "Home Repairs", href: "/services/home-repairs" },
                { name: "Gardening", href: "/services/gardening" },
                { name: "Tutoring", href: "/services/tutoring" },
                { name: "Health & Wellness", href: "/services/health-wellness" },
                { name: "Cleaning", href: "/services/cleaning" },
                { name: "Professional Services", href: "/services/professional" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="flex items-center gap-2 text-xs hover:text-accent transition-colors"
                  >
                    <FiChevronRight className="text-accent" size={14} />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-white">Newsletter</h3>
            <p className="text-xs text-primary-50 font-medium">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-i-14 py-i-10 rounded-md bg-primary-800 border border-primary-700 text-white placeholder:text-primary-400 focus:outline-none focus:border-accent"
                />
              </div>
              <PrimaryBtn text="Subscribe" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-i-lg pt-i-10 flex flex-col sm:flex-row justify-between items-center footer-divider">
          <p className="text-xs text-primary-200 py-i-20">© {new Date().getFullYear()} UrbanAid. All rights reserved.</p>
          <div className="flex gap-6 mt-i-10 sm:mt-0">
            <Link to="/privacy" className="text-xs text-primary-200 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-primary-200 hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-xs text-primary-200 hover:text-accent transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client'
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Our Pages Section */}
          <div>
            <h2 className="text-xl font-semibold">Our Pages</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <ul className="mt-3 space-y-2">
              <li><i className="fa-solid fa-phone" /> +91 7980507953</li>
              <li>
                <Link href="mailto:info@example.com">
                  <i className="fa-solid fa-envelope" /> ideacanvus@gmail.com
                </Link>
              </li>
              <li><i className="fa-solid fa-location-dot" /> Kolkata</li>
            </ul>
          </div>
          
          {/* Company Info Section */}
          <div>
            <h2 className="text-xl font-semibold">Company</h2>
            <p className="mt-3">Providing quality services since 2025. Dedicated to customer satisfaction.</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-10 text-gray-400">
          <p>Copyright © 2025 IdeaCanvus. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
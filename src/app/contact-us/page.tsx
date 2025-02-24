'use client'
import ContactForm from "@/components/contact-form"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
 
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
  
  
    
   
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/contactus-bg-image.webp?height=1080&width=1920')" }}
    >
         <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Image
              src="/images/icon_transparent.png"
              alt="IdeaCanvus Logo"
              width={120}
              height={48}
              className="w-auto h-12"
            />
            <nav className="flex items-center space-x-12">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/" },
                { name: "Contact Us", href: "/contact-us" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-light tracking-wide transition-all duration-300
                    ${
                      isScrolled
                        ? "text-gray-800 hover:text-[#0C3C4A] dark:text-gray-200 dark:hover:text-[#0C3C4A]"
                        : "text-white hover:text-[#0C3C4A]"
                    }
                    ${
                      activeSection === item.href.substring(1)
                        ? "text-[#0C3C4A] dark:text-[#0C3C4A]"
                        : ""
                    }
                  `}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0C3C4A] via-purple-500 to-pink-500 opacity-80"></div>
      </header>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-4xl px-4">
        <ContactForm />
      </div>
    </main>
  )
}


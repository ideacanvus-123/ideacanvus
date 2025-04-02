"use client"
import { useState } from "react"
import ContactForm from "@/components/contact-form"
import { motion } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/contactus-bg-image.webp?height=1080&width=1920')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Image
              src="/images/icon_transparent.webp"
              alt="IdeaCanvus Logo"
              width={120}
              height={48}
              className="w-auto h-10"
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-base font-normal tracking-wide transition-all duration-300
                    ${
                      "Contact Us" === item.name
                        ? "text-[#0C3C4A] border-b border-[#0C3C4A]"
                        : "text-gray-700 hover:text-[#0C3C4A]"
                    }
                  `}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#0C3C4A] focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-base font-normal py-2 px-4 rounded-md transition-all duration-300
                      ${
                        "Contact Us" === item.name
                          ? "bg-[#0C3C4A]/10 text-[#0C3C4A]"
                          : "text-gray-700 hover:bg-[#0C3C4A]/5 hover:text-[#0C3C4A]"
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Gradient Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0C3C4A] via-[#0C3C4A]/70 to-[#0C3C4A]/50 opacity-80"></div>
      </header>

      {/* Contact Section */}
      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 text-center pt-24 pb-12"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6 md:mb-8">Contact Us</h1>
        <motion.div className="bg-white rounded-lg shadow-2xl overflow-hidden" variants={fadeInUp}>
          <ContactForm />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-white border-t border-gray-200 w-full relative z-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <motion.div className="space-y-4" variants={staggerItem}>
              <Image
                src="/images/icon_transparent.webp"
                alt="Portfolio Logo"
                width={150}
                height={60}
                className="mb-4"
              />
              <p className="text-gray-600 font-light">
                Transforming ideas into digital reality. We help businesses innovate and grow through creative design
                and development.
              </p>
              <div className="flex space-x-4">
                {["facebook", "linkedin", "github"].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#0C3C4A] transition-colors duration-300"
                    variants={staggerItem}
                    aria-label={social}
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                    >
                      {social === "github" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.202 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.93.359.309.678.919.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .267.18.577.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {social === "linkedin" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      )}
                      {social === "facebook" && (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Projects Section */}
            <motion.div className="space-y-4" variants={staggerItem}>
              <h3 className="text-lg font-normal text-[#0C3C4A]">Projects</h3>
              <ul className="space-y-2">
                {[
                  { name: "E-Commerce Platform", href: "#" },
                  { name: "Portfolio Website", href: "#" },
                  { name: "Mobile App Design", href: "#" },
                  { name: "UI/UX Redesign", href: "#" },
                ].map((project, idx) => (
                  <li key={idx}>
                    <a
                      href={project.href}
                      className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2 font-light"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Skills Section */}
            <motion.div className="space-y-4" variants={staggerItem}>
              <h3 className="text-lg font-normal text-[#0C3C4A]">Skills</h3>
              <ul className="space-y-2">
                {["React.js", "Next.js", "Figma", "Node.js", "PHP", "Laravel", "Angular"].map((skill, idx) => (
                  <li key={idx}>
                    <span className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2 font-light">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pages Section */}
            <motion.div className="space-y-4" variants={staggerItem}>
              <h3 className="text-lg font-normal text-[#0C3C4A]">Pages</h3>
              <ul className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/" },
                  { name: "Contact Us", href: "/contact-us/" },
                ].map((post, idx) => (
                  <li key={idx}>
                    <a
                      href={post.href}
                      className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2 font-light"
                    >
                      {post.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 font-light">
              &copy; {new Date().getFullYear()} IdeaCanvus. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </main>
  )
}


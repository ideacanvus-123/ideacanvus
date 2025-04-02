"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Phone, Mail, User, AtSign, MessageSquare } from "lucide-react"

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    }

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
      isValid = false
    }

    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    const emailParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      time: new Date().toISOString(),
      file: file ? file.name : "No file attached",
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ii4y2uq"
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_imawfcc"
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "pcbqtOa05WqXrxRXl"

    emailjs
      .send(serviceId, templateId, emailParams, publicKey)
      .then(() => {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setFile(null)
      })
      .catch((error) => {
        console.error("EmailJS Error:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="mx-0 w-full">
      <div className="grid overflow-hidden rounded-md lg:grid-cols-2">
        {/* Left side - Contact Information */}
        <div className="bg-white p-6 md:p-8">
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-light uppercase tracking-wider text-[#0d3c4b]">Get in touch</h2>
            <h1 className="mb-4 text-2xl font-light text-[#0d3c4b] md:text-3xl">
              Need Any Help For Business & Consulting
            </h1>
            <p className="mb-6 text-sm font-light text-[#0d3c4b] opacity-80">
              Please let us know if you have a question, want to leave a comment, or would like further information
              about us.
            </p>
          </div>

          <div className="space-y-6">

            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3c4b] shadow-lg">
                <Phone className="text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-base font-medium text-[#0d3c4b]">Phone Us</h3>
                <a
                  href="mailto:ideacanvus@gmail.com"
                  className="text-sm font-light text-[#0d3c4b] hover:text-[#0d3c4b]/80 transition-colors"
                >
                  <span className="bg-[#0d3c4b]/10 px-2 py-1 rounded-md">+91 7439425415</span>
                </a>
              </div>
            </div>


            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3c4b] shadow-lg">
                <MessageSquare className="text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-base font-medium text-[#0d3c4b]">Whatsapp</h3>
                <a
                  href="mailto:ideacanvus@gmail.com"
                  className="text-sm font-light text-[#0d3c4b] hover:text-[#0d3c4b]/80 transition-colors"
                >
                  <span className="bg-[#0d3c4b]/10 px-2 py-1 rounded-md">+91 7439425415</span>
                </a>
              </div>
            </div>


            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3c4b] shadow-lg">
                <Mail className="text-white" size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-base font-medium text-[#0d3c4b]">Mail Us</h3>
                <a
                  href="mailto:ideacanvus@gmail.com"
                  className="text-sm font-light text-[#0d3c4b] hover:text-[#0d3c4b]/80 transition-colors"
                >
                  <span className="bg-[#0d3c4b]/10 px-2 py-1 rounded-md block mt-1">ideacanvus@gmail.com</span>
                </a>
              </div>
            </div>


          </div>
        </div>

        {/* Right side - Contact Form or Thank You Message */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0d3c4b] p-6 md:p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="mb-4 text-xl font-light text-white">Thank You!</h2>
              <p className="text-white font-light text-center">
                Your message has been sent successfully. We&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 rounded-md bg-white px-4 py-2 text-[#0d3c4b] transition-colors hover:bg-opacity-90 font-light"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="mb-2 text-sm font-light uppercase tracking-wider text-white">Get in touch</h2>
                <h3 className="text-xl font-light text-white md:text-2xl">Feel free to get in touch</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <User className="text-[#0d3c4b]" size={16} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-none bg-white py-2.5 pl-10 pr-3 text-sm text-[#0d3c4b] placeholder:text-[#0d3c4b]/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Full Name*"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-200">{errors.name}</p>}
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <AtSign className="text-[#0d3c4b]" size={16} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border-none bg-white py-2.5 pl-10 pr-3 text-sm text-[#0d3c4b] placeholder:text-[#0d3c4b]/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Email*"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-200">{errors.email}</p>}
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <Phone className="text-[#0d3c4b]" size={16} />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border-none bg-white py-2.5 pl-10 pr-3 text-sm text-[#0d3c4b] placeholder:text-[#0d3c4b]/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Phone*"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-200">{errors.phone}</p>}
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-md border-none bg-white px-3 py-2.5 text-sm text-[#0d3c4b] placeholder:text-[#0d3c4b]/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Message*"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-200">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-light text-[#0d3c4b] transition-colors hover:bg-opacity-90 disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Send a Message"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Phone, Mail, User, AtSign } from "lucide-react"

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

    // It's better to use environment variables for these values
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ry7w2to"
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_o8n8ddb"
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "bKWhz8akueg3iADmd"

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



  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-md shadow-md max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-[#0d3c4b] mb-4">Thank You!</h2>
        <p className="text-[#0d3c4b]">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 bg-[#0d3c4b] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 shadow-md rounded-md overflow-hidden">
        {/* Left side - Contact Information */}
        <div className="bg-white p-8 md:p-12">
          <div className="mb-12">
            <h2 className="text-lg font-medium text-[#0d3c4b] uppercase tracking-wider mb-4">Get in touch</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0d3c4b] mb-6">
              Need Any Help For Business & Consulting
            </h1>
            <p className="text-[#0d3c4b] opacity-80 mb-8">
              Please let us know if you have a question, want to leave a comment, or would like further information
              about us.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md bg-[#0d3c4b] flex items-center justify-center mr-4">
                <Phone className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0d3c4b]">Call or WhatsApp</h3>
                <p className="text-[#0d3c4b] opacity-80">+91 7439425415</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md bg-[#0d3c4b] flex items-center justify-center mr-4">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0d3c4b]">Mail Us</h3>
                <p className="text-[#0d3c4b] opacity-80">ideacanvus@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0d3c4b] p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white uppercase tracking-wider mb-2">Get in touch</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Feel free to get in touch</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="text-[#0d3c4b]" size={18} />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-[#0d3c4b] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#0d3c4b]/60"
                placeholder="Full Name*"
              />
              {errors.name && <p className="mt-1 text-sm text-red-200">{errors.name}</p>}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <AtSign className="text-[#0d3c4b]" size={18} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-[#0d3c4b] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#0d3c4b]/60"
                placeholder="Email*"
              />
              {errors.email && <p className="mt-1 text-sm text-red-200">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Phone className="text-[#0d3c4b]" size={18} />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-[#0d3c4b] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#0d3c4b]/60"
                placeholder="Phone*"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-200">{errors.phone}</p>}
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-3 bg-white text-[#0d3c4b] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-[#0d3c4b]/60"
                placeholder="Message*"
              />
              {errors.message && <p className="mt-1 text-sm text-red-200">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#0d3c4b] font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send a Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}


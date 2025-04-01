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
        className="mx-auto max-w-2xl rounded-md bg-white p-6 md:p-8 shadow-md"
      >
        <h2 className="mb-4 text-xl font-light text-[#0d3c4b]">Thank You!</h2>
        <p className="text-[#0d3c4b] font-light">
          Your message has been sent successfully. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 rounded-md bg-[#0d3c4b] px-4 py-2 text-white transition-colors hover:bg-opacity-90 font-light"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto w-full">
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
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#0d3c4b]">
                <Phone className="text-white" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-light text-[#0d3c4b]">Call or WhatsApp</h3>
                <p className="text-sm font-light text-[#0d3c4b] opacity-80">+91 7439425415</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#0d3c4b]">
                <Mail className="text-white" size={18} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-light text-[#0d3c4b]">Mail Us</h3>
                <p className="text-sm font-light text-[#0d3c4b] opacity-80">ideacanvus@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0d3c4b] p-6 md:p-8">
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
        </motion.div>
      </div>
    </div>
  )
}


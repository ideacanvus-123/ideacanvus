"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Code,
  Laptop,
  LineChart,
  Server,
  Rocket,
  Users,
  Target,
  Trophy,
  Smartphone,
  Database,
  Settings,
  PenTool,
  Globe,
} from "lucide-react"
import { useRouter } from "next/navigation"

const carouselItems = [
  {
    title: "Building technology",
    image: "/images/bannerimage.webp",
    description: "Cloud solutions and digital transformation",
  },
  {
    title: "Your vision, our expertise",
    image: "/images/banner-4.webp",
    description: "Custom software development that drives growth",
  },
]

const services = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Custom Software Development",
    description: "Tailored solutions to meet your specific business needs",
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Web Development",
    description: "Modern, responsive websites and web applications",
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services",
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Digital Transformation",
    description: "Modernize your business with digital solutions",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for iOS and Android",
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Database Management",
    description: "Efficient database design, optimization, and maintenance",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "SEO & Digital Marketing",
    description: "Boost your online presence with SEO and marketing strategies",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "IT Consulting",
    description: "Expert advice to optimize your IT infrastructure",
  },
  {
    icon: <PenTool className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Create intuitive and engaging user experiences",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Team Augmentation",
    description: "Scale your team with skilled developers and experts",
  },
]
const achievements = [
  {
    icon: <Trophy className="h-12 w-12" />,
    number: "500+",
    title: "Projects Completed",
  },
  {
    icon: <Users className="h-12 w-12" />,
    number: "100+",
    title: "Happy Clients",
  },
  {
    icon: <Target className="h-12 w-12" />,
    number: "10+",
    title: "Years Experience",
  },
  {
    icon: <Rocket className="h-12 w-12" />,
    number: "50+",
    title: "Expert Team",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
    
      const sections = document.querySelectorAll("section[id]")
      const scrollY = window.pageYOffset

      sections.forEach((current) => {
        const section = current as HTMLElement
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 100
        const sectionId = section.getAttribute("id")

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || "")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 font-sans">
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Image
              src="/images/icon_transparent.webp"
              alt="IdeaCanvus Logo"
              width={120}
              height={48}
              className="w-auto h-12"
            />

            {/* Navigation Links */}
            <nav className="flex items-center space-x-8">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Contact Us", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium tracking-wide transition-all duration-300
                    ${
                      activeSection === item.href.substring(1)
                        ? "text-[#0C3C4A] border-b-2 border-[#0C3C4A]"
                        : "text-gray-700 hover:text-[#0C3C4A]"
                    }
                  `}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Gradient Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0C3C4A] via-purple-500 to-pink-500 opacity-80"></div>
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6">{item.title}</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">{item.description}</p>
              <button
                className="bg-gradient-to-r from-yellow-300 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700
                text-white font-medium py-4 px-8 rounded-full transition-all duration-300 
                transform hover:scale-105 flex items-center group shadow-lg hover:shadow-yellow-500/50"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        ))}
        {/* Enhanced carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 
                ${index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"}`}
            />
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} className="text-center group" variants={staggerItem}>
                <div className="inline-block p-4 rounded-full bg-[#0C3C4A]/10 mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <div className="text-[#0C3C4A]">{achievement.icon}</div>
                </div>
                <h3 className="text-3xl mb-2 text-[#0C3C4A]">{achievement.number}</h3>
                <p className="text-gray-600">{achievement.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="md:w-1/2 space-y-6" variants={staggerItem}>
              <div className="inline-block rounded-lg bg-[#0C3C4A]/10 px-4 py-2 text-sm text-[#0C3C4A]">About Us</div>
              <h2 className="text-4xl md:text-5xl leading-tight">
                Transforming Ideas into
                <span className="text-[#0C3C4A]"> Digital Reality</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                IdeaCanvus is your trusted technology partner, delivering innovative IT solutions that help businesses
                thrive in the digital age. We combine technical expertise with creative problem-solving to transform
                your ideas into powerful digital solutions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {["Innovate", "Build", "Transform", "Deliver"].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div
                      className="p-2 rounded-full bg-[#0C3C4A]/10 
                      transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    >
                      <ArrowRight className="h-5 w-5 text-[#0C3C4A]" />
                    </div>
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" variants={staggerItem}>
              <div className="relative">
                <Image
                  src="/images/about_us.webp?height=400&width=600"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0C3C4A] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-lg bg-[#0C3C4A]/10 px-4 py-2 text-sm text-[#0C3C4A] mb-4">
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl mb-4">Solutions We Provide</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We offer comprehensive IT solutions to help your business grow and succeed in the digital world
            </p>
          </motion.div>

          {/* Services Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: [0, -2000],
                }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* First set of cards */}
                {services.map((service, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-[300px] bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-[#0C3C4A] mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}

                {/* Duplicate set of cards for seamless loop */}
                {services.map((service, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-[300px] bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-[#0C3C4A] mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-lg bg-[#0C3C4A]/10 px-4 py-2 text-sm text-[#0C3C4A] mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl mb-8">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Let&apos;s discuss how our IT solutions can help you achieve your business goals
            </p>
            <button
              className="bg-gradient-to-r from-yellow-300 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700
              text-white font-medium py-4 px-8 rounded-full transition-all duration-300 
              transform hover:scale-105 flex items-center mx-auto group"
              onClick={() => router.push("/contact-us")}
            >
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <motion.footer
          className="bg-white border-t border-gray-200 w-full mt-24 relative z-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* About Section */}
              <motion.div className="space-y-4" variants={staggerItem}>
                <Image
                  src="/images/icon_transparent.webp"
                  alt="Portfolio Logo"
                  width={150}
                  height={60}
                  className="mb-4"
                />
                <p className="text-gray-600">
                  Transforming ideas into digital reality. I help businesses innovate and grow through creative design
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
                    >
                      <span className="sr-only">{social}</span>
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
                <h3 className="text-lg font-semibold text-[#0C3C4A]">Projects</h3>
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
                        className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2"
                      >
                        {project.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Skills Section */}
              <motion.div className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold text-[#0C3C4A]">Skills</h3>
                <ul className="space-y-2">
                  {["React.js", "Next.js", "Figma", "Node.js", "PHP", "Laravel", "Angular"].map((skill, idx) => (
                    <li key={idx}>
                      <span className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Blog Section */}
              <motion.div className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold text-[#0C3C4A]">Pages</h3>
                <ul className="space-y-2">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/" },
                    { name: "Contact Us", href: "/contact-us/" },
                  ].map((post, idx) => (
                    <li key={idx}>
                      <a
                        href={post.href}
                        className="text-gray-600 hover:text-[#0C3C4A] transition-all duration-300 block transform hover:translate-x-2"
                      >
                        {post.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Copyright Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                &copy; {new Date().getFullYear()} Your Portfolio Name. All rights reserved.
              </p>
            </div>
          </div>
        </motion.footer>
      </section>
    </main>
  )
}


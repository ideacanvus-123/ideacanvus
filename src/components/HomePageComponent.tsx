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
  Menu,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

const carouselItems = [
  // {
  //   title: "Building technology",
  //   image: "/images/bannerimage.webp",
  //   description: "Cloud solutions and digital transformation",
  // },
  // {
  //   title: "Your vision, our expertise",
  //   image: "/images/banner-4.webp",
  //   description: "Custom software development that drives growth",
  // },
  {
    title: "Crafting Smart Digital Solutions for a Smarter Tomorrow",
    video: "/videos/bg.mp4",
    description: "Sketching Ideas, Coding Dreams....",
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

const socialLinks = [
  {
    name: "facebook",
    url: "https://www.facebook.com/people/Idea-Canvus/61574883719213/?rdid=6mttU2PiKaaJiBlL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15x482ixY8%2F",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/ideacanvus-solutions/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.23 0H1.77C.8 0 0 .775 0 1.73v20.54C0 23.225.8 24 1.77 24h20.46c.97 0 1.77-.775 1.77-1.73V1.73C24 .775 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.5a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.11 12.95h-3.56v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.97v5.7h-3.56V9h3.42v1.56h.05c.47-.89 1.6-1.83 3.29-1.83 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
      </svg>
    ),
  },
  {
    name: "instagram",
    url: "http://instagram.com/ideacanvus/profilecard/?igsh=bTBya3J1OTY5OW9l",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5A3.5 3.5 0 1 0 12 16a3.5 3.5 0 0 0 0-7zm5.75-.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75z"
        />
      </svg>
    ),
  },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-300 font-sans">
      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg">
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
                    ${activeSection === item.href.substring(1)
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
                      ${activeSection === item.href.substring(1)
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

      {/* Enhanced Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden pt-16">
  {carouselItems.map((item, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      <motion.div
        className="absolute inset-0 flex flex-col justify-center text-white text-left px-4 lg:px-24"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-wide drop-shadow-md mb-4">
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Crafting Smart Digital Solutions for a
          </span>
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Smarter Tomorrow
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl font-light">
          {item.description}
        </p>

        <button
  className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
             hover:from-blue-600 hover:to-blue-700 
             text-white font-semibold py-4 px-10 rounded-full 
             transition-all duration-300 transform hover:scale-110 
             flex items-center justify-center group shadow-xl 
             hover:shadow-blue-500/50 focus:outline-none focus:ring-2 
             focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white"
  onClick={() => router.push("/contact-us")}
>
  <span className="text-lg font-bold">Get Started</span>
  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
</button>
      </motion.div>
    </div>
  ))}
</section>


      {/* Achievements Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
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
                <h3 className="text-2xl md:text-3xl mb-2 text-[#0C3C4A] font-normal">{achievement.number}</h3>
                <p className="text-gray-600 font-light">{achievement.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="md:w-1/2 space-y-6" variants={staggerItem}>
              <div className="inline-block rounded-lg bg-[#0C3C4A]/10 px-4 py-2 text-sm text-[#0C3C4A]">About Us</div>
              <h2 className="text-3xl md:text-4xl leading-tight font-normal">
                Transforming Ideas into
                <span className="text-[#0C3C4A]"> Digital Reality</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                IdeaCanvus is your trusted technology partner, delivering innovative IT solutions that help businesses
                thrive in the digital age. We combine technical expertise with creative problem-solving to transform
                your ideas into powerful digital solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {["Innovate", "Build", "Transform", "Deliver"].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 group">
                    <div
                      className="p-2 rounded-full bg-[#0C3C4A]/10 
                      transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    >
                      <ArrowRight className="h-4 w-4 text-[#0C3C4A]" />
                    </div>
                    <span className="text-gray-800 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div className="md:w-1/2 mt-8 md:mt-0" variants={staggerItem}>
              <div className="relative">
                <Image
                  src="/images/about_us.webp?height=400&width=600"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0C3C4A] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0C3C4A]/70 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-lg bg-[#0C3C4A]/10 px-4 py-2 text-sm text-[#0C3C4A] mb-4">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl mb-4 font-normal">Solutions We Provide</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light">
              We offer comprehensive IT solutions to help your business grow and succeed in the digital world
            </p>
          </motion.div>

          {/* Services Grid for Mobile */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.slice(0, 4).map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-[#0C3C4A] mb-4">{service.icon}</div>
                  <h3 className="text-xl font-normal mb-2">{service.title}</h3>
                  <p className="text-gray-600 font-light">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Carousel for Desktop */}
          <div className="relative hidden md:block">
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
                    <h3 className="text-xl font-normal mb-2">{service.title}</h3>
                    <p className="text-gray-600 font-light">{service.description}</p>
                  </div>
                ))}

                {/* Duplicate set of cards for seamless loop */}
                {services.map((service, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-[300px] bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-[#0C3C4A] mb-4">{service.icon}</div>
                    <h3 className="text-xl font-normal mb-2">{service.title}</h3>
                    <p className="text-gray-600 font-light">{service.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-gray-50">
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
            <h2 className="text-3xl md:text-4xl mb-6 md:mb-8 font-normal">Ready to Transform Your Business?</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto font-light">
              Let&apos;s discuss how our IT solutions can help you achieve your business goals
            </p>
            <button
              className="bg-gradient-to-r from-[#0C3C4A] to-[#0C3C4A]/80 hover:from-[#0C3C4A]/90 hover:to-[#0C3C4A]
              text-white font-normal py-3 px-6 rounded-full transition-all duration-300 
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
          className="bg-white border-t border-gray-200 w-full mt-16 md:mt-24 relative z-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
                  {socialLinks.map(({ name, url, icon }) => (
                    <motion.a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0C3C4A] transition-colors duration-300"
                      variants={staggerItem}
                      aria-label={name}
                    >
                      <div
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
          transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                      >
                        {icon}
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
      </section>
    </main>
  )
}


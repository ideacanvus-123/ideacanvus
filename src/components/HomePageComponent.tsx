"use client"

import Image from "next/image"
import { ArrowRight, Code, Laptop, LineChart, Server } from "lucide-react"
import { Button } from "flowbite-react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const carouselItems = [
  {
    title: "Turning ideas into digital excellence",
    image: "/images/homebanner.jpg",
    description: "Innovative IT solutions for modern businesses",
  },
  {
    title: "Your vision, our expertise",
    image: "/images/banner-4.jpg",
    description: "Custom software development that drives growth",
  },
  {
    title: "Building tomorrow's technology",
    image: "/images/bannerimage.jpg",
    description: "Cloud solutions and digital transformation",
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
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Carousel Section */}
      <section className="homepage_slider_section">
        <div className="h-screen">
          <Carousel responsive={responsive} infinite={true} autoPlay autoPlaySpeed={3000} className="h-full">
            {carouselItems.map((item, index) => (
              <div key={index} className="relative h-screen">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="carousel-caption absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                  <h2 className="text-3xl md:text-4xl lg:text-7xl  mb-4">{item.title}</h2>
                  <p className="text-xl md:text-2xl text-gray-200">{item.description}</p>
                  <Button size="lg" className="mt-8 bg-yellow-300 hover:bg-yellow-400 text-white">
                    Get Started
                    <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon.jpg-PydKIvBqtvRdfNwX2LjL6hI7TUseSh.jpeg"
                alt="IdeaCanvus Logo"
                width={300}
                height={120}
                className="mb-6"
              />
              <h2 className="text-3xl md:text-4xl mb-6">Who We Are</h2>
              <p className="text-gray-600 text-lg mb-6">
                IdeaCanvus is your trusted technology partner, delivering innovative IT solutions that help businesses
                thrive in the digital age. We combine technical expertise with creative problem-solving to transform
                your ideas into powerful digital solutions.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Innovate
                </li>
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Build
                </li>
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Transform
                </li>
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Deliver
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="images/about_us.jpg?height=400&width=600"
                alt="About Us"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl  mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our IT solutions can help you achieve your business goals
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 flex items-center">
              Contact Us
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl  mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We offer comprehensive IT solutions to help your business grow and succeed in the digital world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl  mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



    </main>
  )
}


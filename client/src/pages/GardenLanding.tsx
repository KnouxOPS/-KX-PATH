import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GardenLanding() {
  const services = [
    {
      title: "Garden Design",
      description: "Professional landscape design tailored to your space",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=800",
    },
    {
      title: "Landscape Work",
      description: "Complete landscaping solutions from planning to execution",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2Feb9cfa06bdf7462eb21124ea4d1a44d8?format=webp&width=800",
    },
    {
      title: "Garden Maintenance",
      description: "Regular care to keep your garden thriving year-round",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=800",
    },
  ];

  const projects = [
    {
      title: "Evening Garden",
      category: "Residential",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=800",
    },
    {
      title: "Minimalist Garden",
      category: "Modern",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2Feb9cfa06bdf7462eb21124ea4d1a44d8?format=webp&width=800",
    },
    {
      title: "Green Display Garden",
      category: "Commercial",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=800",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "We discuss your vision and assess your space",
    },
    {
      number: "02",
      title: "Design",
      description: "Create detailed plans tailored to your needs",
    },
    {
      number: "03",
      title: "Implementation",
      description: "Transform your space with expert craftsmanship",
    },
    {
      number: "04",
      title: "Maintenance",
      description: "Ongoing care to ensure lasting beauty",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700">GreenScape</div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              Contact
            </a>
          </div>
          <Button className="bg-green-700 hover:bg-green-800">Get Quote</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 pb-16 bg-gradient-to-br from-green-50 to-emerald-100"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                Professional Garden Design
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                CREATE YOUR
                <span className="block text-green-700">DREAM GARDEN</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Transform your outdoor space with our expert landscape design
                and maintenance services. We bring your vision to life with
                sustainable and beautiful solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-700 hover:bg-green-800">
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-700 text-green-700 hover:bg-green-50"
                >
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=800"
                alt="Beautiful garden landscape"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-green-800 text-green-100">
                About Us
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                WE ARE DIFFERENT
                <span className="block text-green-400">IN EVERY WAYS</span>
              </h2>
              <p className="text-lg text-green-100 mb-8">
                With over 15 years of experience in landscape design and garden
                maintenance, we've transformed countless outdoor spaces into
                stunning, sustainable environments. Our team combines creativity
                with horticultural expertise to deliver exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    500+
                  </div>
                  <div className="text-green-100">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    15+
                  </div>
                  <div className="text-green-100">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2Feb9cfa06bdf7462eb21124ea4d1a44d8?format=webp&width=400"
                alt="Garden design work"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F03cce8c2122f4422ae8033646d081de7?format=webp&width=400"
                alt="Landscape maintenance"
                className="rounded-lg h-48 w-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              WHAT WE DO BEST
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial design concepts to ongoing maintenance, we provide
              comprehensive garden and landscape services tailored to your
              unique needs and vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full border-green-700 text-green-700 hover:bg-green-50"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">
              Our Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              SIMPLE STEPS FOR
              <span className="block text-green-700">OUR LANDSCAPE WORK</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">
              Our Projects
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              FEATURED WORK
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of stunning garden transformations and
              landscape designs that showcase our commitment to excellence and
              creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        {project.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            MAKE YOUR DREAM
            <span className="block text-green-400">GARDEN INTO REALITY</span>
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your outdoor space? Get in touch with our expert
            team for a free consultation and personalized design proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-400 text-green-400 hover:bg-green-800"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-4">
                GreenScape
              </div>
              <p className="text-gray-400 mb-4">
                Creating beautiful, sustainable outdoor spaces that enhance your
                lifestyle and connect you with nature.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Garden Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Landscape Work
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Maintenance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@greenscape.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 123 Garden St, Green City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GreenScape. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

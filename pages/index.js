import React, { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function index() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log("Subscribing email:", email);
    // Reset the email input
    setEmail("");
  };
  return (
    <div className="bg-black text-[#f0f0f0] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Level Up Your Fitness
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover products, get personalized training, and achieve your
            fitness goals.
          </p>
          <button className="bg-[#0af5b7] text-black px-8 py-3 rounded-full text-lg font-semibold hover:shadow-[0_0_15px_rgba(10,245,183,0.5)] transition-shadow duration-300">
            Explore Products
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Training",
                description:
                  "Get custom workout plans tailored to your fitness goals and preferences.",
              },
              {
                title: "Premium Products",
                description:
                  "Access to high-quality fitness equipment and supplements for optimal performance.",
              },
              {
                title: "Expert Coaches",
                description:
                  "Learn from certified professionals with years of experience in various fitness disciplines.",
              },
              {
                title: "Nutrition Plans",
                description:
                  "Receive personalized meal plans to complement your workout routine and maximize results.",
              },
              {
                title: "Progress Tracking",
                description:
                  "Monitor your fitness journey with advanced tracking tools and analytics.",
              },
              {
                title: "Community Support",
                description:
                  "Join a motivating community of like-minded individuals to share experiences and stay accountable.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border border-[#0af5b7] rounded-lg p-6 hover:bg-gray-800 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Trending Products
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-6">
            {[1, 2, 3, 4, 5].map((product) => (
              <div
                key={product}
                className="flex-none w-64 bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnK_w-gr0YboyjJurCqgemCRxfCrApm1h0bw&s`}
                    alt={`Product ${product}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-[#ff4a4a] text-white px-4 py-2 rounded-full">
                      View Product
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Product {product}
                  </h3>
                  <p className="text-sm mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <span className="text-[#0af5b7] font-bold">$99.99</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Spotlight */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Meet Our Coaches
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-6">
            {[1, 2, 3, 4, 5].map((coach) => (
              <div key={coach} className="flex-none w-64 text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnK_w-gr0YboyjJurCqgemCRxfCrApm1h0bw&s`}
                    alt={`Coach ${coach}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Coach {coach}
                </h3>
                <p className="text-sm mb-4">Specialty: Weight Training</p>
                <button className="bg-[#0057ff] text-white px-4 py-2 rounded-full hover:shadow-[0_0_15px_rgba(0,87,255,0.5)] transition-shadow duration-300">
                  Book a Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-6">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="flex-none w-80 bg-gray-900 rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnK_w-gr0YboyjJurCqgemCRxfCrApm1h0bw&s`}
                    alt={`User ${testimonial}`}
                    className="w-16 h-16 rounded-full mr-4 filter grayscale"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      User {testimonial}
                    </h3>
                    <div className="flex text-[#0af5b7]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#0af5b7]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Join us today and start your personalized fitness program.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-shadow duration-300">
            Get Started
          </button>
        </div>
      </section>
      <Navbar></Navbar>
    </div>
  );
}

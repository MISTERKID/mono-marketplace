
import React from "react";
import Layout from "@/components/Layout";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">About MONO</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              MONO is a premium home goods brand dedicated to creating products that combine minimalist aesthetics with exceptional functionality. Founded in 2023, our mission is to help our customers create spaces that feel both sophisticated and serene.
            </p>
            
            <div className="aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern workspace with MONO products" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground mb-4">
              We believe that good design should be accessible to everyone. Our products are crafted with attention to detail, using high-quality materials that stand the test of time. We focus on creating pieces that are not just beautiful, but also practical for everyday use.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment to Sustainability</h2>
            <p className="text-muted-foreground mb-4">
              At MONO, we are committed to reducing our environmental impact. We carefully select materials that are sustainable and ethically sourced. Our packaging is minimalist and recyclable, and we continuously work to improve our production processes to minimize waste.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="MONO product showcase" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="MONO workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-4">
              Our team is made up of passionate designers, craftspeople, and customer service specialists who are dedicated to creating and delivering products that exceed expectations. We work collaboratively to ensure that every item that bears the MONO name is of the highest quality.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-2">
              We love hearing from our customers. If you have any questions, feedback, or just want to say hello, please don't hesitate to get in touch.
            </p>
            <p className="text-muted-foreground mb-8">
              Email: info@monostore.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Design Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

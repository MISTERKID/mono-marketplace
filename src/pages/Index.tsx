import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProducts } from "@/services/productService";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, MoveRight, ArrowRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const Index: React.FC = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] bg-gradient-to-br from-secondary to-background">
        {/* Hero Image Container */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img 
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Modern furniture"
              className="h-full w-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 backdrop-blur-[1px]"></div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[600px] lg:h-[700px] items-center">
            <div className="max-w-xl space-y-6 py-8">
              <h1 
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl [text-wrap:balance]"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  animationDuration: "1s",
                  animationDelay: "0.2s"
                }}
              >
                <span className="block mb-2">Modern design for</span>
                <AnimatedText 
                  words={[
                    "modern living",
                    "your lifestyle",
                    "your comfort",
                    "your space"
                  ]}
                  className="text-primary-foreground"
                />
              </h1>
              <p 
                className="text-lg sm:text-xl text-white/90 [text-wrap:balance]"
                style={{ 
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  animationDuration: "1s",
                  animationDelay: "0.4s"
                }}
              >
                Discover our collection of minimalist home goods and furniture.
              </p>
              <div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                style={{ animationDuration: "1s", animationDelay: "0.6s" }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="rounded-full px-8 transition-all duration-500 hover:gap-2 group bg-white text-black hover:bg-white/90"
                >
                  <Link to="/products" className="flex items-center">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 bg-transparent text-white border-white hover:bg-white/10 transition-all duration-500"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold animate-fade-in" style={{ animationDuration: "0.8s" }}>Featured Products</h2>
            <Button asChild variant="ghost" className="gap-1 group">
              <Link to="/products" className="flex items-center">
                View All
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="animate-fade-in" style={{ animationDuration: "1s", animationDelay: "0.3s" }}>
            <ProductGrid products={featuredProducts || []} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Categories Section with smooth animations */}
      <section className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center animate-fade-in" style={{ animationDuration: "0.8s" }}>Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["home", "furniture", "electronics", "office"].map((category, index) => {
              const categoryImages = {
                home: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
                furniture: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
                electronics: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=800",
                office: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800"
              };
              
              return (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-background hover-scale animate-fade-in"
                  style={{ animationDuration: "0.8s", animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <img 
                    src={categoryImages[category]} 
                    alt={category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-semibold text-white capitalize tracking-wide">
                      {category}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/50">
        <div 
          className="container max-w-screen-lg text-center animate-fade-in"
          style={{ animationDuration: "1s", animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-12">Why Choose MONO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every product is carefully curated and quality-tested to ensure the best for your home.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable shipping to bring your chosen items right to your doorstep.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Easy Returns</h3>
              <p className="text-muted-foreground">
                Hassle-free returns and exchanges if you're not completely satisfied with your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import { fetchProducts, getCategories } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "default";
  
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sort, setSort] = useState(sortParam);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const isMobile = useIsMobile();
  
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  
  // Filter products based on criteria
  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        // Default sorting (by ID or featured)
        return a.id - b.id;
    }
  });
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchTerm) params.set("search", searchTerm);
    if (sort !== "default") params.set("sort", sort);
    setSearchParams(params);
  }, [selectedCategory, searchTerm, sort, setSearchParams]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search term is already being tracked by state
  };
  
  const clearFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
    setPriceRange([0, 500]);
    setSort("default");
    setSearchParams(new URLSearchParams());
  };
  
  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-sm h-8 px-2"
          >
            Clear All
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="all-categories" 
                  checked={selectedCategory === ""}
                  onCheckedChange={() => setSelectedCategory("")}
                />
                <label 
                  htmlFor="all-categories" 
                  className="text-sm cursor-pointer"
                >
                  All Categories
                </label>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategory === category}
                    onCheckedChange={() => setSelectedCategory(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`} 
                    className="text-sm capitalize cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="mt-2">
              <Select 
                value={`${priceRange[0]}-${priceRange[1]}`}
                onValueChange={(value) => {
                  const [min, max] = value.split('-').map(Number);
                  setPriceRange([min, max]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">All Prices</SelectItem>
                  <SelectItem value="0-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-300">$200 - $300</SelectItem>
                  <SelectItem value="300-500">Over $300</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <div className="flex items-center space-x-2">
            {/* Mobile Filter Button */}
            {isMobile && (
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            {/* Sort Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <div className="md:w-1/4 lg:w-1/5">
              <FilterPanel />
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filters display */}
            {(selectedCategory || searchTerm || sort !== "default") && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-muted-foreground py-1">Active filters:</span>
                
                {selectedCategory && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => setSelectedCategory("")}
                  >
                    Category: {selectedCategory}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => setSearchTerm("")}
                  >
                    Search: {searchTerm}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                {sort !== "default" && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => setSort("default")}
                  >
                    Sort: {sort.replace("-", " ")}
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            
            <ProductGrid 
              products={sortedProducts} 
              isLoading={isLoadingProducts || isLoadingCategories} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

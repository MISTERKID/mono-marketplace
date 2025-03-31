import { Product } from "@/types";

// Sample mock data for our products
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Minimal Desk Lamp",
    price: 109.99,
    description: "A sleek minimalist desk lamp with adjustable brightness and color temperature. Perfect for your home office or bedside table.",
    category: "home",
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.8, count: 120 },
    featured: true
  },
  {
    id: 2,
    title: "Ergonomic Office Chair",
    price: 299.99,
    description: "High-quality ergonomic office chair with lumbar support and breathable mesh back. Adjustable height and armrests for maximum comfort.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.5, count: 87 },
    featured: true
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 199.99,
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    category: "electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.7, count: 215 },
    featured: true
  },
  {
    id: 4,
    title: "Minimalist Wall Clock",
    price: 59.99,
    description: "Modern minimalist wall clock with silent sweep movement. Perfect for living room, bedroom, or office.",
    category: "home",
    image: "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.3, count: 63 },
    featured: true
  },
  {
    id: 5,
    title: "Smart Speaker",
    price: 129.99,
    description: "Voice-controlled smart speaker with premium sound quality and built-in virtual assistant. Control your smart home and stream music effortlessly.",
    category: "electronics",
    image: "https://images.pexels.com/photos/6980077/pexels-photo-6980077.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.4, count: 92 },
    featured: true
  },
  {
    id: 6,
    title: "Modular Bookshelf",
    price: 249.99,
    description: "Customizable modular bookshelf system that can be arranged in multiple configurations. Made from sustainable materials.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.6, count: 78 },
    featured: true
  },
  {
    id: 7,
    title: "Ceramic Coffee Mug Set",
    price: 39.99,
    description: "Set of 4 handcrafted ceramic coffee mugs in a modern minimalist design. Microwave and dishwasher safe.",
    category: "home",
    image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.2, count: 45 }
  },
  {
    id: 8,
    title: "Portable External SSD",
    price: 149.99,
    description: "Ultra-fast portable SSD with 1TB storage. Compact size with USB-C connectivity for quick data transfer.",
    category: "electronics",
    image: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.9, count: 113 }
  },
  {
    id: 9,
    title: "Wool Throw Blanket",
    price: 89.99,
    description: "Luxurious 100% wool throw blanket. Soft, warm, and perfect for cozy evenings. Available in multiple neutral colors.",
    category: "home",
    image: "https://images.pexels.com/photos/6032280/pexels-photo-6032280.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.7, count: 89 }
  },
  {
    id: 10,
    title: "Minimalist Desk Organizer",
    price: 49.99,
    description: "Clean and modern desk organizer made from sustainable bamboo. Keeps your workspace tidy and organized.",
    category: "office",
    image: "https://images.pexels.com/photos/6207094/pexels-photo-6207094.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.4, count: 67 }
  },
  {
    id: 11,
    title: "Wireless Charging Pad",
    price: 39.99,
    description: "Sleek wireless charging pad compatible with all Qi-enabled devices. Fast charging with LED indicator.",
    category: "electronics",
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.3, count: 52 }
  },
  {
    id: 12,
    title: "Modern Floor Lamp",
    price: 179.99,
    description: "Contemporary floor lamp with adjustable arm and dimmable LED light. Perfect for reading or ambient lighting.",
    category: "home",
    image: "https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: { rate: 4.5, count: 73 }
  }
];

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (): Promise<Product[]> => {
  await delay(800); // Simulate network request
  return mockProducts;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await delay(600); // Simulate network request
  return mockProducts.filter(product => product.featured);
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  await delay(500); // Simulate network request
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(700); // Simulate network request
  return mockProducts.filter(p => p.category === category);
};

export const getCategories = async (): Promise<string[]> => {
  await delay(300); // Simulate network request
  const categories = [...new Set(mockProducts.map(p => p.category))];
  return categories;
};

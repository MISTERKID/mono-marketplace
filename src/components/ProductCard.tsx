import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
    >
      <Card className="border-none shadow-none overflow-hidden product-card">
        <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/30">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/400x400/e2e8f0/475569?text=Product+Image";
              target.onerror = null; // Prevent infinite loop if placeholder also fails
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-medium line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {product.category}
          </p>
          <div className="mt-2 font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;

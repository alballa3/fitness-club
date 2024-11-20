import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronUp,
  Search,
  Dumbbell,
  Instagram,
  Facebook,
  Twitter,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";

// Mock product data (unchanged)
const products = [
  {
    id: 1,
    name: "Pro Fitness Tracker",
    price: 199.99,
    discountedPrice: 179.99,
    description: "Advanced health monitoring and workout tracking",
    rating: 4.8,
    reviews: 328,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop",
    badge: "Best Seller",
    discount: 10,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Bluetooth Earbuds",
    price: 129.99,
    description: "Sweatproof and secure fit for intense workouts",
    rating: 4.5,
    reviews: 195,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    badge: "New Arrival",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Premium Yoga Mat",
    price: 59.99,
    description: "Extra thick for joint protection and comfort",
    rating: 4.7,
    reviews: 410,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
    category: "Equipment",
  },
  {
    id: 4,
    name: "Whey Protein Powder",
    price: 54.99,
    discountedPrice: 49.99,
    description: "25g of protein per serving for muscle recovery",
    rating: 4.6,
    reviews: 276,
    image:
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&h=300&fit=crop",
    discount: 9,
    category: "Nutrition",
  },
  {
    id: 5,
    name: "Adjustable Dumbbell Set",
    price: 299.99,
    description: "Space-saving design, 5-52.5 lbs per dumbbell",
    rating: 4.9,
    reviews: 152,
    image:
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=300&h=300&fit=crop",
    badge: "Top Rated",
    category: "Equipment",
  },
  {
    id: 6,
    name: "Compression Leggings",
    price: 79.99,
    description: "High-waisted with phone pocket, squat-proof",
    rating: 4.4,
    reviews: 188,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=300&fit=crop",
    category: "Apparel",
  },
  {
    id: 7,
    name: "Foam Roller",
    price: 34.99,
    discountedPrice: 29.99,
    description: "Textured surface for deep tissue massage",
    rating: 4.3,
    reviews: 95,
    image:
      "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=300&h=300&fit=crop",
    discount: 14,
    category: "Equipment",
  },
  {
    id: 8,
    name: "Resistance Bands Set",
    price: 24.99,
    description: "5 levels of resistance for versatile workouts",
    rating: 4.7,
    reviews: 320,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop",
    badge: "Best Value",
    category: "Equipment",
  },
];

const mainProduct = {
  id: 0,
  name: "Ultimate Home Gym Package",
  price: 1499.99,
  discountedPrice: 1299.99,
  description:
    "Transform your home into a complete fitness center with our all-in-one package. Includes adjustable dumbbells, a versatile bench, resistance bands, and a year of online personal training.",
  rating: 4.9,
  reviews: 523,
  image:
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop",
  badge: "Limited Offer",
  discount: 13,
  category: "Equipment",
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card
      className="overflow-hidden transition-all duration-200 transform hover:scale-105 hover:shadow-md hover:shadow-primary/10 bg-gray-800 border-gray-700 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="overflow-hidden" style={{ paddingBottom: "100%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 transform hover:scale-110"
            loading="lazy"
          />
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              className="bg-primary/80 text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              Quick View
            </Button>
          </div>
        )}
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-white hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "stroke-current fill-none"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        <p className="text-sm text-gray-300 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {product.discountedPrice ? (
              <>
                <span className="font-bold text-lg text-primary">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MainProductCard = ({ product }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-gray-800 border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-gray-800" />
            ) : (
              <Play className="h-6 w-6 text-gray-800" />
            )}
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {product.name}
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "stroke-current fill-none"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-gray-300">
              {product.description}
            </TabsContent>
            <TabsContent value="features" className="text-gray-300">
              <ul className="list-disc list-inside">
                <li>Complete home gym solution</li>
                <li>Adjustable equipment for all fitness levels</li>
                <li>Online personal training included</li>
                <li>Space-efficient design</li>
              </ul>
            </TabsContent>
            <TabsContent value="specs" className="text-gray-300">
              <ul className="list-disc list-inside">
                <li>Weight range: 5-52.5 lbs per dumbbell</li>
                <li>Bench dimensions: 47" x 17.5" x 21.5"</li>
                <li>Resistance bands: 5 levels (10-50 lbs)</li>
                <li>1-year warranty on all equipment</li>
              </ul>
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-bold text-2xl text-primary">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              Save ${(product.price - product.discountedPrice).toFixed(2)}
            </Badge>
          </div>
          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function Product() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products
    .filter((product) => {
      const price = product.discountedPrice || product.price;
      return (
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        (!showDiscounted || product.discountedPrice) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return (
            (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
          );
        case "price-high-low":
          return (
            (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
          );
        case "popular":
          return b.reviews - a.reviews;
        default: // 'newest'
          return b.id - a.id;
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Fitness Gear & Supplements
        </h1>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-12">
          <MainProductCard product={mainProduct} />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white rounded-md">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Apparel">Apparel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white rounded-md">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-primary">Filters</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <Label htmlFor="price-range" className="mb-2 block text-gray-300">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-discounted"
                checked={showDiscounted}
                onCheckedChange={setShowDiscounted}
              />
              <Label htmlFor="show-discounted" className="text-gray-300">
                Show only discounted items
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Dumbbell className="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <p className="text-xl text-gray-400 mb-4">
              No products found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 300]);
                setShowDiscounted(false);
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              Reset Filters
            </Button>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Load More Products
          </Button>
        </div>

        {showBackToTop && (
          <Button
            className="fixed bottom-8 right-8 rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            onClick={scrollToTop}
            size="icon"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>
     <Navbar></Navbar>
    </div>
  );
}

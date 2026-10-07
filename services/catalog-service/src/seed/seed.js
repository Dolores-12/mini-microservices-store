require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");
const Category = require("../models/Category");

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
  {
    name: "Electronics",
    description: "Electronic devices and accessories",
  },
  {
    name: "Smartphones",
    description: "Smartphones and mobile devices",
  },
  {
    name: "Laptops",
    description: "Laptops and portable computers",
  },
  {
    name: "Home & Living",
    description: "Furniture and home essentials",
  },
  {
    name: "Fashion",
    description: "Clothing and fashion accessories",
  },
  {
    name: "Beauty",
    description: "Beauty and personal care products",
  },
  {
    name: "Kitchen",
    description: "Kitchen appliances and accessories",
  },
  {
    name: "Gaming",
    description: "Gaming consoles and accessories",
  },
];

// =====================================================
// CATEGORY IMAGES
// =====================================================

const categoryImages = {
  Electronics: {
    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/electronics",
  },

  Smartphones: {
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/smartphones",
  },

  Laptops: {
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/laptops",
  },

  "Home & Living": {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/home-living",
  },

  Fashion: {
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/fashion",
  },

  Beauty: {
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/beauty",
  },

  Kitchen: {
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/kitchen",
  },

  Gaming: {
    url: "https://images.unsplash.com/photo-1592840496694-26c035b52b7f?auto=format&fit=crop&w=800&q=80",
    publicId: "seed/gaming",
  },
};

// =====================================================
// PRODUCTS
// =====================================================

const products = [
  // ===================================================
  // SMARTPHONES - 6
  // ===================================================

  {
    name: "iPhone 15",
    description: "Apple smartphone with 128GB storage",
    price: 850000,
    stock: 25,
    category: "Smartphones",
  },

  {
    name: "Samsung Galaxy S24",
    description: "Premium Samsung Android smartphone",
    price: 780000,
    stock: 20,
    category: "Smartphones",
  },

  {
    name: "Google Pixel 8",
    description: "Google smartphone with advanced camera",
    price: 650000,
    stock: 18,
    category: "Smartphones",
  },

  {
    name: "OnePlus 12",
    description: "High-performance Android smartphone",
    price: 620000,
    stock: 15,
    category: "Smartphones",
  },

  {
    name: "Xiaomi Redmi Note 13",
    description: "Affordable smartphone with AMOLED display",
    price: 280000,
    stock: 30,
    category: "Smartphones",
  },

  {
    name: "Tecno Camon 30",
    description: "Tecno smartphone with high-resolution camera",
    price: 310000,
    stock: 28,
    category: "Smartphones",
  },

  // ===================================================
  // LAPTOPS - 5
  // ===================================================

  {
    name: "MacBook Air M3",
    description: "Apple laptop powered by the M3 chip",
    price: 1450000,
    stock: 10,
    category: "Laptops",
  },

  {
    name: "Dell XPS 15",
    description: "Premium Dell productivity laptop",
    price: 1350000,
    stock: 12,
    category: "Laptops",
  },

  {
    name: "HP Pavilion 15",
    description: "Reliable laptop for work and study",
    price: 720000,
    stock: 20,
    category: "Laptops",
  },

  {
    name: "Lenovo ThinkPad E14",
    description: "Business laptop with durable design",
    price: 680000,
    stock: 15,
    category: "Laptops",
  },

  {
    name: "ASUS VivoBook 15",
    description: "Affordable laptop for everyday computing",
    price: 590000,
    stock: 18,
    category: "Laptops",
  },

  // ===================================================
  // ELECTRONICS - 6
  // ===================================================

  {
    name: "Sony WH-1000XM5",
    description: "Wireless noise-cancelling headphones",
    price: 520000,
    stock: 14,
    category: "Electronics",
  },

  {
    name: "JBL Flip 6",
    description: "Portable Bluetooth speaker",
    price: 180000,
    stock: 25,
    category: "Electronics",
  },

  {
    name: "Apple AirPods Pro",
    description: "Wireless earbuds with active noise cancellation",
    price: 390000,
    stock: 20,
    category: "Electronics",
  },

  {
    name: "Anker Power Bank",
    description: "20000mAh portable power bank",
    price: 75000,
    stock: 40,
    category: "Electronics",
  },

  {
    name: "Samsung 55-inch Smart TV",
    description: "4K smart television",
    price: 850000,
    stock: 8,
    category: "Electronics",
  },

  {
    name: "Amazon Echo Dot",
    description: "Smart speaker with voice assistant",
    price: 95000,
    stock: 22,
    category: "Electronics",
  },

  // ===================================================
  // HOME & LIVING - 6
  // ===================================================

  {
    name: "Modern Office Chair",
    description: "Ergonomic office chair for comfortable work",
    price: 185000,
    stock: 15,
    category: "Home & Living",
  },

  {
    name: "LED Floor Lamp",
    description: "Modern adjustable LED floor lamp",
    price: 65000,
    stock: 25,
    category: "Home & Living",
  },

  {
    name: "Memory Foam Pillow",
    description: "Comfortable memory foam sleeping pillow",
    price: 35000,
    stock: 35,
    category: "Home & Living",
  },

  {
    name: "Queen Size Bedsheet",
    description: "Premium cotton queen-size bedsheet",
    price: 55000,
    stock: 30,
    category: "Home & Living",
  },

  {
    name: "Decorative Wall Mirror",
    description: "Modern decorative wall mirror",
    price: 85000,
    stock: 12,
    category: "Home & Living",
  },

  {
    name: "Three-Seater Sofa",
    description: "Comfortable modern living room sofa",
    price: 650000,
    stock: 6,
    category: "Home & Living",
  },

  // ===================================================
  // FASHION - 5
  // ===================================================

  {
    name: "Classic Denim Jacket",
    description: "Unisex blue denim jacket",
    price: 75000,
    stock: 20,
    category: "Fashion",
  },

  {
    name: "Men's Casual Sneakers",
    description: "Comfortable everyday sneakers",
    price: 85000,
    stock: 25,
    category: "Fashion",
  },

  {
    name: "Women's Handbag",
    description: "Elegant everyday leather handbag",
    price: 95000,
    stock: 18,
    category: "Fashion",
  },

  {
    name: "Classic Wristwatch",
    description: "Stylish analog wristwatch",
    price: 120000,
    stock: 12,
    category: "Fashion",
  },

  {
    name: "Premium Sunglasses",
    description: "UV-protection fashion sunglasses",
    price: 45000,
    stock: 30,
    category: "Fashion",
  },

  // ===================================================
  // BEAUTY - 4
  // ===================================================

  {
    name: "Facial Cleanser",
    description: "Gentle daily facial cleanser",
    price: 18000,
    stock: 40,
    category: "Beauty",
  },

  {
    name: "Vitamin C Serum",
    description: "Brightening vitamin C facial serum",
    price: 25000,
    stock: 35,
    category: "Beauty",
  },

  {
    name: "Moisturizing Body Lotion",
    description: "Hydrating body lotion for daily use",
    price: 15000,
    stock: 45,
    category: "Beauty",
  },

  {
    name: "Perfume Eau de Parfum",
    description: "Long-lasting premium fragrance",
    price: 65000,
    stock: 20,
    category: "Beauty",
  },

  // ===================================================
  // KITCHEN - 4
  // ===================================================

  {
    name: "Air Fryer",
    description: "Digital air fryer for healthier cooking",
    price: 145000,
    stock: 15,
    category: "Kitchen",
  },

  {
    name: "Electric Kettle",
    description: "Fast-boiling stainless steel kettle",
    price: 45000,
    stock: 30,
    category: "Kitchen",
  },

  {
    name: "Blender",
    description: "High-power kitchen blender",
    price: 85000,
    stock: 20,
    category: "Kitchen",
  },

  {
    name: "Rice Cooker",
    description: "Automatic electric rice cooker",
    price: 65000,
    stock: 18,
    category: "Kitchen",
  },

  // ===================================================
  // GAMING - 4
  // ===================================================

  {
    name: "PlayStation 5",
    description: "Sony next-generation gaming console",
    price: 950000,
    stock: 8,
    category: "Gaming",
  },

  {
    name: "Xbox Series X",
    description: "Microsoft high-performance gaming console",
    price: 850000,
    stock: 7,
    category: "Gaming",
  },

  {
    name: "Gaming Headset",
    description: "Immersive headset for gaming",
    price: 95000,
    stock: 20,
    category: "Gaming",
  },

  {
    name: "Wireless Gaming Controller",
    description: "Wireless controller for console gaming",
    price: 85000,
    stock: 22,
    category: "Gaming",
  },
];

// =====================================================
// SEED FUNCTION
// =====================================================

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string not found. Check your Catalog Service .env."
      );
    }

    await mongoose.connect(mongoUri);

    console.log("Connected to MongoDB");

    // ---------------------------------------------------
    // CREATE / UPDATE CATEGORIES
    // ---------------------------------------------------

    const categoryMap = {};

    for (const categoryData of categories) {
      const category = await Category.findOneAndUpdate(
        { name: categoryData.name },
        {
          ...categoryData,
          isActive: true,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

      categoryMap[category.name] = category._id;
    }

    console.log(`${categories.length} categories ready`);

    // ---------------------------------------------------
    // CREATE / UPDATE PRODUCTS
    // ---------------------------------------------------

    for (const product of products) {
      const categoryId = categoryMap[product.category];

      const image = categoryImages[product.category];

      if (!categoryId) {
        throw new Error(
          `Category not found for product: ${product.name}`
        );
      }

      if (!image) {
        throw new Error(
          `Image configuration not found for category: ${product.category}`
        );
      }

      await Product.findOneAndUpdate(
        { name: product.name },
        {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: categoryId,

          images: [
            {
              url: image.url,
              publicId: image.publicId,
            },
          ],

          isActive: true,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(`${products.length} products ready`);
    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
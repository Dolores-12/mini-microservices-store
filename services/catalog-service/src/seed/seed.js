require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");
const Category = require("../models/Category");

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

const products = [
  // Smartphones - 6
  ["iPhone 15", "Apple smartphone with 128GB storage", 850000, 25, "Smartphones"],
  ["Samsung Galaxy S24", "Premium Samsung Android smartphone", 780000, 20, "Smartphones"],
  ["Google Pixel 8", "Google smartphone with advanced camera", 650000, 18, "Smartphones"],
  ["OnePlus 12", "High-performance Android smartphone", 620000, 15, "Smartphones"],
  ["Xiaomi Redmi Note 13", "Affordable smartphone with AMOLED display", 280000, 30, "Smartphones"],
  ["Tecno Camon 30", "Tecno smartphone with high-resolution camera", 310000, 28, "Smartphones"],

  // Laptops - 5
  ["MacBook Air M3", "Apple laptop powered by the M3 chip", 1450000, 10, "Laptops"],
  ["Dell XPS 15", "Premium Dell productivity laptop", 1350000, 12, "Laptops"],
  ["HP Pavilion 15", "Reliable laptop for work and study", 720000, 20, "Laptops"],
  ["Lenovo ThinkPad E14", "Business laptop with durable design", 680000, 15, "Laptops"],
  ["ASUS VivoBook 15", "Affordable laptop for everyday computing", 590000, 18, "Laptops"],

  // Electronics - 6
  ["Sony WH-1000XM5", "Wireless noise-cancelling headphones", 520000, 14, "Electronics"],
  ["JBL Flip 6", "Portable Bluetooth speaker", 180000, 25, "Electronics"],
  ["Apple AirPods Pro", "Wireless earbuds with active noise cancellation", 390000, 20, "Electronics"],
  ["Anker Power Bank", "20000mAh portable power bank", 75000, 40, "Electronics"],
  ["Samsung 55-inch Smart TV", "4K smart television", 850000, 8, "Electronics"],
  ["Amazon Echo Dot", "Smart speaker with voice assistant", 95000, 22, "Electronics"],

  // Home & Living - 6
  ["Modern Office Chair", "Ergonomic office chair for comfortable work", 185000, 15, "Home & Living"],
  ["LED Floor Lamp", "Modern adjustable LED floor lamp", 65000, 25, "Home & Living"],
  ["Memory Foam Pillow", "Comfortable memory foam sleeping pillow", 35000, 35, "Home & Living"],
  ["Queen Size Bedsheet", "Premium cotton queen-size bedsheet", 55000, 30, "Home & Living"],
  ["Decorative Wall Mirror", "Modern decorative wall mirror", 85000, 12, "Home & Living"],
  ["Three-Seater Sofa", "Comfortable modern living room sofa", 650000, 6, "Home & Living"],

  // Fashion - 5
  ["Classic Denim Jacket", "Unisex blue denim jacket", 75000, 20, "Fashion"],
  ["Men's Casual Sneakers", "Comfortable everyday sneakers", 85000, 25, "Fashion"],
  ["Women's Handbag", "Elegant everyday leather handbag", 95000, 18, "Fashion"],
  ["Classic Wristwatch", "Stylish analog wristwatch", 120000, 12, "Fashion"],
  ["Premium Sunglasses", "UV-protection fashion sunglasses", 45000, 30, "Fashion"],

  // Beauty - 4
  ["Facial Cleanser", "Gentle daily facial cleanser", 18000, 40, "Beauty"],
  ["Vitamin C Serum", "Brightening vitamin C facial serum", 25000, 35, "Beauty"],
  ["Moisturizing Body Lotion", "Hydrating body lotion for daily use", 15000, 45, "Beauty"],
  ["Perfume Eau de Parfum", "Long-lasting premium fragrance", 65000, 20, "Beauty"],

  // Kitchen - 4
  ["Air Fryer", "Digital air fryer for healthier cooking", 145000, 15, "Kitchen"],
  ["Electric Kettle", "Fast-boiling stainless steel kettle", 45000, 30, "Kitchen"],
  ["Blender", "High-power kitchen blender", 85000, 20, "Kitchen"],
  ["Rice Cooker", "Automatic electric rice cooker", 65000, 18, "Kitchen"],

  // Gaming - 4
  ["PlayStation 5", "Sony next-generation gaming console", 950000, 8, "Gaming"],
  ["Xbox Series X", "Microsoft high-performance gaming console", 850000, 7, "Gaming"],
  ["Gaming Headset", "Immersive headset for gaming", 95000, 20, "Gaming"],
  ["Wireless Gaming Controller", "Wireless controller for console gaming", 85000, 22, "Gaming"],
];

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

    for (const [
      name,
      description,
      price,
      stock,
      categoryName,
    ] of products) {
      await Product.findOneAndUpdate(
        { name },
        {
          name,
          description,
          price,
          stock,
          category: categoryMap[categoryName],
          images: [],
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
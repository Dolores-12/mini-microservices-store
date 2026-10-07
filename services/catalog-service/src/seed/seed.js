require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

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
// PRODUCT IMAGES
// =====================================================

const productImages = {
  "iPhone 15": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337972/mini-microservices-store/products/pexels-a-darmel-7862350.jpg",
    publicId:
      "mini-microservices-store/products/pexels-a-darmel-7862350",
  },

  "Samsung Galaxy S24": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337973/mini-microservices-store/products/pexels-a-darmel-7862390.jpg",
    publicId:
      "mini-microservices-store/products/pexels-a-darmel-7862390",
  },

  "Google Pixel 8": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337974/mini-microservices-store/products/pexels-airamdphoto-15940010.jpg",
    publicId:
      "mini-microservices-store/products/pexels-airamdphoto-15940010",
  },

  "OnePlus 12": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337976/mini-microservices-store/products/pexels-brunxs-20388126.jpg",
    publicId:
      "mini-microservices-store/products/pexels-brunxs-20388126",
  },

  "Xiaomi Redmi Note 13": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337977/mini-microservices-store/products/pexels-caleboquendo-7772548.jpg",
    publicId:
      "mini-microservices-store/products/pexels-caleboquendo-7772548",
  },

  "Tecno Camon 30": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337978/mini-microservices-store/products/pexels-curayagjovan-4917455.jpg",
    publicId:
      "mini-microservices-store/products/pexels-curayagjovan-4917455",
  },

  "MacBook Air M3": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337979/mini-microservices-store/products/pexels-denys-9327162.jpg",
    publicId:
      "mini-microservices-store/products/pexels-denys-9327162",
  },

  "Dell XPS 15": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337980/mini-microservices-store/products/pexels-derio-13465232.jpg",
    publicId:
      "mini-microservices-store/products/pexels-derio-13465232",
  },

  "HP Pavilion 15": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337981/mini-microservices-store/products/pexels-dhanno-22434759.jpg",
    publicId:
      "mini-microservices-store/products/pexels-dhanno-22434759",
  },

  "Lenovo ThinkPad E14": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337983/mini-microservices-store/products/pexels-fox-58267-35285814.jpg",
    publicId:
      "mini-microservices-store/products/pexels-fox-58267-35285814",
  },

  "ASUS VivoBook 15": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337985/mini-microservices-store/products/pexels-gasheri-46103936-35666033.jpg",
    publicId:
      "mini-microservices-store/products/pexels-gasheri-46103936-35666033",
  },

  "Sony WH-1000XM5": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337986/mini-microservices-store/products/pexels-harveyvillarino-5269699.jpg",
    publicId:
      "mini-microservices-store/products/pexels-harveyvillarino-5269699",
  },

  "JBL Flip 6": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337988/mini-microservices-store/products/pexels-joshua-wall-803111889-29617989.jpg",
    publicId:
      "mini-microservices-store/products/pexels-joshua-wall-803111889-29617989",
  },

  "Apple AirPods Pro": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337989/mini-microservices-store/products/pexels-karola-g-5202048.jpg",
    publicId:
      "mini-microservices-store/products/pexels-karola-g-5202048",
  },

  "Anker Power Bank": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337991/mini-microservices-store/products/pexels-mikhail-nilov-6893890.jpg",
    publicId:
      "mini-microservices-store/products/pexels-mikhail-nilov-6893890",
  },

  "Samsung 55-inch Smart TV": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337992/mini-microservices-store/products/pexels-mohammadabbasi-30319668.jpg",
    publicId:
      "mini-microservices-store/products/pexels-mohammadabbasi-30319668",
  },

  "Amazon Echo Dot": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337994/mini-microservices-store/products/pexels-phong-thanh-3607237-36680543.jpg",
    publicId:
      "mini-microservices-store/products/pexels-phong-thanh-3607237-36680543",
  },

  "Modern Office Chair": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337996/mini-microservices-store/products/pexels-pixabay-273671.jpg",
    publicId:
      "mini-microservices-store/products/pexels-pixabay-273671",
  },

  "LED Floor Lamp": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337997/mini-microservices-store/products/pexels-ron-lach-8879615.jpg",
    publicId:
      "mini-microservices-store/products/pexels-ron-lach-8879615",
  },

  "Memory Foam Pillow": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337998/mini-microservices-store/products/pexels-ron-lach-8879641.jpg",
    publicId:
      "mini-microservices-store/products/pexels-ron-lach-8879641",
  },

  "Queen Size Bedsheet": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791338000/mini-microservices-store/products/pexels-sound-on-3394650.jpg",
    publicId:
      "mini-microservices-store/products/pexels-sound-on-3394650",
  },

  "Decorative Wall Mirror": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791338000/mini-microservices-store/products/pexels-zion-14486282.jpg",
    publicId:
      "mini-microservices-store/products/pexels-zion-14486282",
  },

  // Reuse uploaded images for the remaining products.
  "Three-Seater Sofa": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337996/mini-microservices-store/products/pexels-pixabay-273671.jpg",
    publicId:
      "mini-microservices-store/products/pexels-pixabay-273671",
  },

  "Classic Denim Jacket": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337997/mini-microservices-store/products/pexels-ron-lach-8879615.jpg",
    publicId:
      "mini-microservices-store/products/pexels-ron-lach-8879615",
  },

  "Men's Casual Sneakers": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337998/mini-microservices-store/products/pexels-ron-lach-8879641.jpg",
    publicId:
      "mini-microservices-store/products/pexels-ron-lach-8879641",
  },

  "Women's Handbag": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337972/mini-microservices-store/products/pexels-a-darmel-7862350.jpg",
    publicId:
      "mini-microservices-store/products/pexels-a-darmel-7862350",
  },

  "Classic Wristwatch": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337973/mini-microservices-store/products/pexels-a-darmel-7862390.jpg",
    publicId:
      "mini-microservices-store/products/pexels-a-darmel-7862390",
  },

  "Premium Sunglasses": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337974/mini-microservices-store/products/pexels-airamdphoto-15940010.jpg",
    publicId:
      "mini-microservices-store/products/pexels-airamdphoto-15940010",
  },

  "Facial Cleanser": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337976/mini-microservices-store/products/pexels-brunxs-20388126.jpg",
    publicId:
      "mini-microservices-store/products/pexels-brunxs-20388126",
  },

  "Vitamin C Serum": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337977/mini-microservices-store/products/pexels-caleboquendo-7772548.jpg",
    publicId:
      "mini-microservices-store/products/pexels-caleboquendo-7772548",
  },

  "Moisturizing Body Lotion": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337978/mini-microservices-store/products/pexels-curayagjovan-4917455.jpg",
    publicId:
      "mini-microservices-store/products/pexels-curayagjovan-4917455",
  },

  "Perfume Eau de Parfum": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337979/mini-microservices-store/products/pexels-denys-9327162.jpg",
    publicId:
      "mini-microservices-store/products/pexels-denys-9327162",
  },

  "Air Fryer": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337980/mini-microservices-store/products/pexels-derio-13465232.jpg",
    publicId:
      "mini-microservices-store/products/pexels-derio-13465232",
  },

  "Electric Kettle": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337981/mini-microservices-store/products/pexels-dhanno-22434759.jpg",
    publicId:
      "mini-microservices-store/products/pexels-dhanno-22434759",
  },

  "Blender": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337983/mini-microservices-store/products/pexels-fox-58267-35285814.jpg",
    publicId:
      "mini-microservices-store/products/pexels-fox-58267-35285814",
  },

  "Rice Cooker": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337985/mini-microservices-store/products/pexels-gasheri-46103936-35666033.jpg",
    publicId:
      "mini-microservices-store/products/pexels-gasheri-46103936-35666033",
  },

  "PlayStation 5": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337986/mini-microservices-store/products/pexels-harveyvillarino-5269699.jpg",
    publicId:
      "mini-microservices-store/products/pexels-harveyvillarino-5269699",
  },

  "Xbox Series X": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337988/mini-microservices-store/products/pexels-joshua-wall-803111889-29617989.jpg",
    publicId:
      "mini-microservices-store/products/pexels-joshua-wall-803111889-29617989",
  },

  "Gaming Headset": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337989/mini-microservices-store/products/pexels-karola-g-5202048.jpg",
    publicId:
      "mini-microservices-store/products/pexels-karola-g-5202048",
  },

  "Wireless Gaming Controller": {
    url: "https://res.cloudinary.com/sp0fqi2q/image/upload/v1791337991/mini-microservices-store/products/pexels-mikhail-nilov-6893890.jpg",
    publicId:
      "mini-microservices-store/products/pexels-mikhail-nilov-6893890",
  },
};

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

      
      if (!categoryId) {
        throw new Error(
          `Category not found for product: ${product.name}`
        );
      }
    
      const image = productImages[product.name];
      if (!image) {
        throw new Error(
          `Image configuration not found for product: ${product.name}`
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

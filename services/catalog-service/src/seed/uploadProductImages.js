require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

const imagesFolder = path.join(__dirname, "product-images");

const uploadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath, path.extname(filePath));

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "mini-microservices-store/products",
        resource_type: "image",
        public_id: fileName,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          fileName,
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    fs.createReadStream(filePath).pipe(uploadStream);
  });
};

async function uploadAllImages() {
  try {
    if (!fs.existsSync(imagesFolder)) {
      throw new Error(`Image folder not found: ${imagesFolder}`);
    }

    const files = fs
      .readdirSync(imagesFolder)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    if (files.length === 0) {
      throw new Error("No product images found.");
    }

    console.log(`Found ${files.length} product images.`);
    console.log("Starting Cloudinary upload...\n");

    const results = [];

    for (const file of files) {
      const filePath = path.join(imagesFolder, file);

      console.log(`Uploading: ${file}`);

      const result = await uploadImage(filePath);

      results.push(result);

      console.log(`SUCCESS: ${result.url}\n`);
    }

    console.log("========================================");
    console.log("ALL IMAGES UPLOADED SUCCESSFULLY");
    console.log("========================================\n");

    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("Upload failed:", error.message);
    process.exitCode = 1;
  }
}

uploadAllImages();
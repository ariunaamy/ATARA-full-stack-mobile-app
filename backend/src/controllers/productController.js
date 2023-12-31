const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all products
router.get("/", async (req, res) => {
  const allProducts = await prisma.product.findMany();
  res.json(allProducts);
});

// get one product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findUnique({
    where: { id: id },
  });
  res.json(product);
});

// create new product
router.post("/", async (req, res) => {
  const newProduct = await prisma.product.create({ data: req.body });
  res.json(newProduct);
});

//update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProductData = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: updatedProductData,
  });
  res.json(updatedProduct);
});

// delete Product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await prisma.product.delete({
    where: { id: id },
  });
  res.json(deletedProduct);
});

module.exports = router;

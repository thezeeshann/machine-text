import prisma from "../DB/db.config.js";

export const createProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
        include:{
            category:true
        }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        categoryId: parseInt(categoryId),
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

import prisma from "../DB/db.config.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Please provide a name" });
    }
    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });
    return res.status(201).json({ newCategory });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.status(404).json({ error: "No categories found" });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

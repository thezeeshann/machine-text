import prisma from "../DB/db.config.js";

export const createProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: "Category ID not found" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 10) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      take: limit,
      skip: skip,
      include: {
        category: true,
      },
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);


    return res.json({
      data: products,
      metadata: {
        totalPages,
        currentPage: page,
        currentLimit: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

 
export const getSingleProduct = async(req, res)=> {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
      return res.status(404).json({
        error: "Name and Category ID are required",
      });
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        categoryId: parseInt(categoryId),
      },
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

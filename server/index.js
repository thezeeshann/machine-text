import express from "express";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 8000;

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Your server is running up");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

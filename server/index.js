import express from "express";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();
app.use(express.json());
const PORT = 8000;

app.use("/api/v1/category", categoryRoute);

app.get("/", (req, res) => {
  res.send("Your server is running up");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

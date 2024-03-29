import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <main className="w-full min-h-screen px-10 py-10 overflow-x-hidden bg-gray-300">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      </Routes>
    </main>
  );
}

export default App;

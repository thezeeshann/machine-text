import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constent";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !categoryId) {
      return toast.error("enter Product name");
    }
    try {
      const data = {
        name: name,
        categoryId: categoryId,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/product/create`,
        data
      );

      if (!response.status === 201) {
        throw new Error(response.data.error);
      }
      toast.success("Product Added Successfully");
      setName("");
      setCategoryId("");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <p className="text-3xl font-semibold text-center underline">
        Add Products
      </p>

      <div className="mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Enter product name"
            name="name"
            className="p-2 text-white border-none rounded-md outline-none bg-slate-500 "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            min={1}
            type="number"
            placeholder="Enter category id"
            name="categoryId"
            className="p-2 text-white border-none rounded-md outline-none bg-slate-500 "
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-1 text-white rounded-md bg-slate-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

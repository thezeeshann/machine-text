import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/category/create`,
        data
      );
      if (response.status === 201) {
        toast.success("Category Added Successfully");
        setName("");
      }
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
            placeholder="Enter category name"
            name="name"
            className="p-2 text-white border-none rounded-md outline-none bg-slate-500 "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-1 text-white rounded-md bg-slate-700"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

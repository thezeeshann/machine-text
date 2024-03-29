import { useState } from "react";
import { BASE_URL } from "../utils/constent";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
// import { useCategory } from "../utils/hooks";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
//   const { categories } = useCategory();
  const [name, setName] = useState("");


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/category/update/${id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Category Updated Successfully");
      }
      setName("");
      navigate("/category");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <p className="text-3xl font-semibold text-center underline">
        Update Category
      </p>

      <div className="mt-10">
        <form onSubmit={handleUpdate} className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Enter product name"
            name="name"
            className="p-2 text-white border-none rounded-md outline-none bg-slate-500 "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-1 text-white rounded-md bg-slate-700"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;

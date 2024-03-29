import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/product/${id}`);
        setName(response.data.name);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        console.log("error while feting single data", error);
      }
    };

    getSingleProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        categoryId: categoryId,
      };
      const response = await axios.put(
        `${BASE_URL}/api/v1/product/update/${id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Product Updated Successfully");
      }
      setName("");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <p className="text-3xl font-semibold text-center underline">
        Update Products
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
          <input
            min={1}
            type="number"
            readOnly
            value={categoryId}
            placeholder="Enter category id"
            name="categoryId"
            className="p-2 text-white border-none rounded-md outline-none bg-slate-500 "
          />
          <button
            type="submit"
            className="px-2 py-1 text-white rounded-md bg-slate-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useProducts } from "../utils/hooks";

const Products = () => {
  const { products, isLoading, setProducts } = useProducts();
  

  const deleteProducts = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/product/delete/${id}`
      );
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <p className="text-3xl font-semibold text-center underline">
        All Products
      </p>

      <div className="mt-10">
        <div className="flex flex-row gap-x-2">
          <Link to="/addProduct">
            <button className="px-2 py-1 text-white rounded-md bg-slate-700">
              Add Product
            </button>
          </Link>
          <Link to="/addCategory">
            <button className="px-2 py-1 text-white bg-gray-700 rounded-md">
              Add Category
            </button>
          </Link>
          <Link to="/category">
            <button className="px-2 py-1 text-white bg-gray-700 rounded-md">
              Show Category
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-3xl font-semibold text-center">Loading....</div>
        ) : (
          <div className="flex flex-row flex-wrap mt-5 gap-x-2 ">
            {products.map((product) => (
              <div
                key={product.id}
                className=" w-[250px] p-2 flex flex-row justify-between items-center border-[1px] cursor-pointerF"
              >
                <div>
                  <div className="flex flex-row items-center gap-x-2">
                    <span className="font-semibold text-neutral-500">
                      Category -{" "}
                    </span>
                    <span>{product.category.id}</span>
                    <p className="d">{product.category.name}</p>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <span className="font-semibold text-neutral-500">
                      Product -{" "}
                    </span>
                    <span className="text-sm">{product.id}</span>
                    <p className="text-sm">{product.name}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2">
                  <MdDelete
                    onClick={() => deleteProducts(product.id)}
                    size={"1.5rem"}
                    className="text-red-500 cursor-pointer"
                  />
                  <Link to={`/updateProduct/${product.id}`}>
                    <MdEdit
                      size={"1.5rem"}
                      className="text-green-500 cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

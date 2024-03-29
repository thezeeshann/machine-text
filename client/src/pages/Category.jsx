import { useCategory } from "../utils/hooks";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import {toast} from "react-hot-toast"

const Category = () => {
  const { isLoading, categories,setCategories } = useCategory();

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/category/delete/${id}`
      );
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
      }
      toast.success("Category Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <p className="text-3xl font-semibold text-center underline">
        All Category
      </p>
      <div className="mt-10">
      {isLoading ? (
          <div className="text-3xl font-semibold text-center">Loading....</div>
        ) : (
          <div className="flex flex-row flex-wrap mt-5 gap-x-2 ">
            {categories.map((category) => (
              <div
                key={category.id}
                className=" w-[250px] p-2 flex flex-row justify-between items-center border-[1px] cursor-pointerF"
              >
                <div>
                  <div className="flex flex-row items-center gap-x-2">
                    <span className="font-semibold text-neutral-500">
                      Category -{" "}
                    </span>
                    <span>{category.id}</span>
                    <p className="d">{category.name}</p>
                  </div>
                
                </div>
                <div className="flex flex-row gap-x-2">
                  <MdDelete
                    onClick={() => deleteCategory(category.id)}
                    size={"1.5rem"}
                    className="text-red-500 cursor-pointer"
                  />
                  {/* <Link to={`/updateProduct/${product.id}`}> */}
                    <MdEdit
                      size={"1.5rem"}
                      className="text-green-500 cursor-pointer"
                    />
                  {/* </Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;

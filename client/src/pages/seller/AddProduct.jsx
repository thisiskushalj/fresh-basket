import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axios.post(
        "/api/product/add",
        formData,
        {
          withCredentials: true, // 🔥 REQUIRED
        }
      );

      if (data.success) {
        toast.success(data.message);

        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id={`image${index}`}
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                  />

                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5 flex-wrap">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="flex-1 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />

          <input
            type="number"
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            required
            className="flex-1 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <button className="px-8 py-2.5 bg-primary text-white rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

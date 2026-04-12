import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image3, setImage3] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Add New Product</h2>
      <p className="text-gray-400 text-sm mb-6">Fill in the details to add a new product to your store</p>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
        {/* Image Upload */}
        <div className="glass-card rounded-2xl p-6">
          <p className="font-semibold text-gray-800 mb-4">Product Images</p>
          <div className="flex gap-4">
            {[
              { img: image1, setImg: setImage1, id: "image1" },
              { img: image2, setImg: setImage2, id: "image2" },
              { img: image3, setImg: setImage3, id: "image3" },
              { img: image4, setImg: setImage4, id: "image4" },
            ].map(({ img, setImg, id }) => (
              <label key={id} className="cursor-pointer group" htmlFor={id}>
                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 group-hover:border-[#e94560] transition-colors duration-300 flex items-center justify-center bg-gray-50">
                  <img
                    className="w-full h-full object-cover"
                    src={!img ? assets.upload_area : URL.createObjectURL(img)}
                    alt="upload"
                  />
                </div>
                <input onChange={(e) => setImg(e.target.files[0])} type="file" id={id} hidden />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <p className="font-semibold text-gray-800">Product Details</p>
          <div>
            <p className="text-sm text-gray-500 mb-2">Product Name</p>
            <input
              className="w-full max-w-xl px-4 py-3 bg-gray-50 text-sm"
              type="text"
              placeholder="Type Here"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Product Description</p>
            <textarea
              className="w-full max-w-xl px-4 py-3 bg-gray-50 text-sm min-h-[100px]"
              placeholder="Add Product Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Category</p>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-4 py-3 bg-gray-50 text-sm">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Sub Category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-4 py-3 bg-gray-50 text-sm">
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Price</p>
              <input
                className="w-full px-4 py-3 bg-gray-50 text-sm"
                type="Number"
                placeholder="25"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>
        </div>

        {/* Sizes & Options */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
          <p className="font-semibold text-gray-800">Sizes & Options</p>
          <div>
            <p className="text-sm text-gray-500 mb-3">Available Sizes</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <div
                  key={s}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(s)
                        ? prev.filter((item) => item !== s)
                        : [...prev, s]
                    )
                  }
                >
                  <p
                    className={`px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-300 ${
                      sizes.includes(s)
                        ? "bg-gradient-to-r from-[#e94560] to-[#f5a623] text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className="w-5 h-5 accent-[#e94560] rounded"
            />
            <label className="cursor-pointer text-sm text-gray-700 font-medium" htmlFor="bestseller">
              Add to bestseller
            </label>
          </div>
        </div>

        <button className="w-fit shimmer-btn text-white font-semibold px-10 py-3.5 rounded-full text-sm tracking-wide hover:scale-105 active:scale-95 transition-transform duration-300" type="submit">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;

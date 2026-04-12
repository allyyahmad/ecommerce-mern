import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, backendUrl } = useContext(ShopContext);

  return (
    <Link className="group cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-2xl bg-gray-50 relative">
        <img
          className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={backendUrl + '/uploads/' + image[0]}
          alt="product_image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold py-2.5 rounded-xl hover:bg-white transition-colors">
            Quick View
          </button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-gray-700 text-sm font-medium group-hover:text-[#e94560] transition-colors duration-300 line-clamp-1">{name}</p>
        <p className="text-gray-900 font-bold text-base mt-1">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;

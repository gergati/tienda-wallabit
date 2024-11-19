import { ChangeEvent, FormEvent, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Users } from "../assets/icons/Users";
import { useCartStore } from "../store/cart-store";
import { ProductTotal } from "./ProductTotal";
import { AddProducts } from "../assets/icons/AddProducts";
import { TagsIcon } from "../assets/icons/TagsIcon";
import { CantidadIcon } from "../assets/icons/CantidadIcon";
import { Carrito } from "./Carrito";

interface FormData {
  cantidad: number;
  id: number | null;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}


export const CardTitle = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState<FormData>({
    cantidad: 0,
    id: null,
  });

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const { product, error, loading } = useFetch(formData.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "id" ? parseInt(value) || null : parseInt(value),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product) {
      return;
    }
    const total = formData.cantidad * product.price;
    console.log(`El precio total es: $${total.toFixed(2)}`);


    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: formData.cantidad
    };
    addProductToCart(cartProduct);
    setCartProducts((prevProducts) => [...prevProducts, cartProduct])
    setFormData({ cantidad: 0, id: null });
  };



  return (
    <div className="flex flex-col gap-3">
      <div className="md:w-[700px] w-full border border-black/25 md:h-[150px] flex flex-col gap-3 p-4 rounded-2xl shadow-xl">
        <div className="flex gap-2 justify-start items-center">
          <Users />
          <h1 className="text-lg font-primaryBold text-[20px]">Tienda Wallbit</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col md:flex-row gap-2 items-center justify-center">
          <div className="mb-6  w-full md:w-[250px]">
            <label htmlFor="cantidad" className="font-primaryMedium">Cantidad:</label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <CantidadIcon />
              </div>
              <input
                type="number"
                name="cantidad"
                id="cantidad"
                value={formData.cantidad || ""}
                onChange={handleChange}
                required
                className="border-[0.1px] rounded-xl p-2 w-full pl-10 webkit-appearance-none moz-appearance-none appearance-none focus:outline-none focus:ring focus:ring-green-700 focus:ring-opacity-70 focus:border-[0.1px]"
              />

            </div>
          </div>
          <div className="mb-6 relative w-full md:w-[250px]">
            <label htmlFor="id" className="font-primaryMedium">ID del producto:</label>

            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <TagsIcon />
              </div>
              <input
                type="number"
                name="id"
                id="id"
                value={formData.id || ""}
                onChange={handleChange}
                required
                className="border-[0.1px] rounded-xl p-2 w-full pl-10 webkit-appearance-none moz-appearance-none appearance-none focus:outline-none focus:ring focus:ring-green-700 focus:ring-opacity-70 focus:border-[0.1px]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-200 to-green-500 flex gap-2 items-center justify-center text-black h-10 md:w-28 rounded font-primaryMedium border border-green-500 hover:scale-105 hover:transition-all w-full"
            disabled={loading}
          >
            <AddProducts />
            {loading ? "Loading..." : "Agregar"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-1">No existe el ID que desea agregar</p>}

      </div>

      <ProductTotal />
      <Carrito />
    </div>
  );
};

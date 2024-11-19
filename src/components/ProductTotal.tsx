import { DeleteIcon } from "../assets/icons/DeleteIcon"
import { useCartStore } from "../store/cart-store"

export const ProductTotal = () => {
    const { cart, fechaCreacion } = useCartStore(state => state)
    const removeCart = useCartStore(state => state.removeCart)

    const formatearFecha = (fecha: Date) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <>
            <div className="flex gap-2 flex-col md:w-[700px] w-[98%] p-2 m-auto border rounded-2xl border-green-700 shadow-gray-400 shadow-lg my-6">
                <h3 className="font-primaryBold text-[18px] ml-2">Carrito de compra:  {formatearFecha(fechaCreacion)}</h3>
                <div className="flex items-center justify-center">
                    <div className="overflow-x-auto">
                        {
                            cart.length === 0 ? (
                                <h3 className="font-primaryRegular ml-2">No hay productos en el carrito aún, prueba agregando arriba con su id y la cantidad que deseas ingresar</h3>
                            ) : (
                                <div className="">
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 md:w-full w-[98%]">
                                        {cart.map((product) => (
                                            <div className="flex border border-black/25 rounded-xl p-2" key={product.id}>
                                                <div className="">
                                                    <img src={product.image} alt={product.title} className="h-32 w-32 object-contain" />
                                                </div>
                                                <div className="m-5">
                                                    <p className="text-[14px] font-primaryBold">{product.title}</p>
                                                    <div className="flex flex-col font-primaryRegular">
                                                        <small>Cantidad: {product.quantity}</small>
                                                        <small>Precio unitario: ${product.price}</small>
                                                        <small>Precio Total: ${product.price * product.quantity}</small>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeCart(product)} className="font-medium text-red-600 hover:text-red-900">
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        ))}


                                    </div>

                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Product = {
    id: number,
    quantity: number
    title: string,
    image: string,
    price: number
}

interface State {
    cart: Product[];
    fechaCreacion: Date;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    },
    getTotalProducts: () => number;
    addProductToCart: (product: Product) => void;
    removeCart: (product: Product) => void;
}


export const useCartStore = create<State>()(
    devtools(
        persist(
            (set, get) => ({
                cart: [],
                fechaCreacion: new Date(),
                getTotalProducts: () => {
                    const { cart } = get();
                    return cart.reduce((total, item) => total + item.quantity, 0)
                },
                getSummaryInformation: () => {
                    const { cart } = get();
                    const subTotal = cart.reduce((total, product) => (product.quantity * product.price) + total, 0)

                    const tax = subTotal * 0.15
                    const total = subTotal + tax
                    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

                    return {
                        subTotal,
                        tax,
                        total,
                        itemsInCart
                    }
                },
                addProductToCart: (product: Product) => {
                    const { cart } = get();
                    const ProductInCart = cart.some((item) => (item.id === product.id))
                    if (!ProductInCart) {
                        set({ cart: [...cart, product] })
                    }
                },
                removeCart: (product: Product) => {
                    const { cart } = get();
                    const deleteProducts = cart.filter(
                        (item) => item.id !== product.id
                    )
                    set({ cart: deleteProducts })
                },
            })
            , {
                name: 'wallbit-cart',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)
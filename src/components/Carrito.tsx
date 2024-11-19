import { useCartStore } from "../store/cart-store"
import { currencyFormat } from "../utils/currencyFormat";

interface SummaryInformation {
	subTotal: number;
	tax: number;
	total: number;
	itemsInCart: number;
}

export const Carrito = () => {
	const { getSummaryInformation } = useCartStore();
	const { subTotal, tax, total, itemsInCart }: SummaryInformation = getSummaryInformation();

	return (
		<div className="border border-gray-600 p-3 font-primaryBold rounded-xl shadow-md">
			<p>Subtotal: <span className="font-primaryRegular">{currencyFormat(subTotal)}</span></p>
			<p>Impuesto: <span className="font-primaryRegular">{currencyFormat(tax)}</span></p>
			<p>Total: <span className="font-primaryRegular">{currencyFormat(total)}</span></p>
			<p>Productos en carrito: <span className="font-primaryRegular">{itemsInCart}</span></p>
		</div>
	);
};
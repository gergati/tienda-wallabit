import { useEffect, useState } from "react";

interface Producto {
    id: number;
    title: string;
    price: number;
    image: string;
}

export const useFetch = (id: number | null) => {
    const [product, setProduct] = useState<Producto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id === null) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) throw new Error("Producto no encontrado.");
                const data: Producto = await response.json();
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Error desconocido.");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { product, error, loading };
};

import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
}

interface UseFetchCategoriesResult {
    categories: Category[];
    loading: boolean;
    error: Error | null;
}

export const useFetchCategories = (endpoint: string): UseFetchCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const baseUrl = 'http://10.10.10.101:14080/api/';
    const url = baseUrl + endpoint;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { categories, loading, error };
};

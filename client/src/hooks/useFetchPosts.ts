import { useState, useEffect } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author_first_name: string;
    created_at: string;
    updated_at: string;
}

interface UseFetchPostsResult {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export const useFetchPosts = (endpoint: string): UseFetchPostsResult => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const baseUrl = 'http://10.10.10.101:14080/api/';
    const url = baseUrl + endpoint;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data.sort((a: Post, b: Post) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())); // Rendezés DESC
            setLoading(false);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { posts, loading, error, refetch: fetchData };
};

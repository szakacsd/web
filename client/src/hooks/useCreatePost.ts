import { useState } from 'react';

interface CreatePostData {
    title: string;
    content: string;
    categories: { label: string; value: string }[];
    author_first_name: string;
}

interface UseCreatePostResult {
    createPost: (data: CreatePostData) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

export const useCreatePost = (refetchPosts: () => void): UseCreatePostResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const createPost = async (data: CreatePostData) => {
        setLoading(true);
        try {
            const response = await fetch('http://10.10.10.101:14080/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    categories: data.categories.map((category) => category.value),
                    author_first_name: data.author_first_name,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            refetchPosts();
            setLoading(false);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
    };

    return { createPost, loading, error };
};

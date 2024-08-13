import { useState } from 'react';

interface Comment {
    id: number;
    post_id: number;
    message: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

interface UsePostCommentResult {
    postComment: (comment: Omit<Comment, 'created_at' | 'updated_at'>) => Promise<Comment | null>;
    loading: boolean;
    error: Error | null;
}

export const usePostComment = (postId: number): UsePostCommentResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const postComment = async (comment: Omit<Comment, 'created_at' | 'updated_at'>): Promise<Comment | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://10.10.10.101:14080/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment: Comment = await response.json();
            setLoading(false);
            return newComment;
        } catch (error) {
            setError(error as Error);
            setLoading(false);
            return null;
        }
    };

    return { postComment, loading, error };
};

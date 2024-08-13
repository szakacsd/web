import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import PostView from './PostView';
import { Skeleton } from '@/components/ui/skeleton';

interface Post {
    id: number;
    title: string;
    content: string;
    author_first_name: string;
    created_at: string;
    updated_at: string;
    categories?: { id: number; name: string }[];
}

interface PostListProps {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-red-500 text-center mt-4">
        {message}
    </div>
);

const PostListSkeleton: React.FC<{ count: number }> = ({ count }) => (
    <>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="p-4">
                <Skeleton className="h-6 mb-2 w-1/2" />
                <Skeleton className="h-4 mb-2 w-3/4" />
                <Skeleton className="h-4 mb-2 w-1/3" />
            </div>
        ))}
    </>
);

const PostViewSkeleton: React.FC = () => (
    <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex items-center justify-between border-b pb-4">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
    </div>
);

const PostList: React.FC<PostListProps> = ({ posts, loading, error, refetch }) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handleSelect = (post: Post) => {
        setSelectedPost(post);
    };

    useEffect(() => {
        if (!loading && posts.length > 0) {
            setSelectedPost(posts[0]);
        }
    }, [loading, posts]);

    return (
        <div className="flex w-full container">
            <div className="w-1/2 h-screen overflow-y-auto border-r pt-4 max-h-screen">
                {loading ? (
                    <PostListSkeleton count={5} />
                ) : (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} onSelect={handleSelect} />
                    ))
                )}
                {error && <ErrorMessage message="An error occurred while fetching the posts" />}
            </div>
            <div className="w-2/3 pr-4 pl-4 pt-4 h-screen overflow-y-auto border-r">
                {selectedPost ? (
                    <PostView post={selectedPost} />
                ) : (
                    <PostViewSkeleton />
                )}
            </div>
        </div>
    );
};

export default PostList;

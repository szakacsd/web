import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatDistanceToNowStrict } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import PostCommentCard from './PostCommentCard';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { usePostComment } from '../hooks/usePostComment';

interface Comment {
    id: number;
    post_id: number;
    message: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author_first_name: string;
    created_at: string;
    updated_at: string;
    categories: { id: number; name: string }[];
    comments: Comment[];
}

interface PostViewProps {
    post: Post;
    onSelect: (post: Post) => void;
}

const FormSchema = z.object({
    comment: z
        .string()
        .min(3, {
            message: 'Comment must be at least 3 characters.',
        })
        .max(160, {
            message: 'Comment must not exceed 160 characters.',
        }),
});

const fetchPostComments = async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`http://10.10.10.101:14080/api/posts/${postId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    const data: Post = await response.json();
    return data.comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export function PostView({ post, onSelect }: PostViewProps) {
    const { postComment, loading, error } = usePostComment(post.id);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // Rendezés csökkenő sorrendbe
        fetchPostComments(post.id).then(setComments).catch(console.error);
    }, [post.id]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = form.handleSubmit(async (data) => {
        const newComment = await postComment({
            post_id: post.id,
            message: data.comment,
            email: 'user@example.com',
        });

        if (newComment) {
            const updatedComments = await fetchPostComments(post.id);
            setComments(updatedComments);
            form.reset();
        }
    });

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <div className="text-sm text-muted-foreground">
                        {post.author_first_name}
                        <span className="mx-1">·</span>
                        {formatDistanceToNowStrict(new Date(post.created_at), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
                <div className="flex gap-2">
                    {post.categories.map(({ id, name }) => (
                        <Badge key={id} className="text-xs">
                            {name}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="p-4">
                <div className="text-muted-foreground">{post.content}</div>
            </div>
            <div className="p-4 border-t">
                <Form {...form}>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="comment">Comment</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write a comment..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </form>
                    {error && <p className="text-red-500">{error.message}</p>}
                </Form>
            </div>
            <div className="p-4 border-t flex flex-col gap-4 h-50 overflow-y-auto">
                <h2 className="text-lg font-bold">Comments</h2>
                <div className="flex flex-col gap-4 mt-4 h-50 overflow-y-auto divide-y">
                    {comments.map((comment) => (
                        <PostCommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostView;

import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Post {
    id: number;
    title: string;
    content: string;
    author_first_name: string;
    created_at: string;
    updated_at: string;
    categories: { id: number; name: string }[];
}

interface PostCardProps {
    post: Post;
    onSelect: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelect }) => {
    const handleSelect = () => onSelect(post);

    return (
        <div className="flex flex-col gap-2 pt-0 pr-4 pb-4">
            <button
                className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent cursor-pointer"
                onClick={handleSelect}
            >
                <div className="flex w-full items-center justify-between">
                    <div className="font-semibold text-md text-primary">{post.title}</div>
                    <div className="text-xs text-muted-foreground">
                        {formatDistanceToNowStrict(new Date(post.created_at), { addSuffix: true })}
                    </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                    {post.content}
                </div>
                <div className="flex items-center gap-2">
                    {post.categories.map(({ id, name }) => (
                        <Badge key={id} className="text-xs">
                            {name}
                        </Badge>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default PostCard;

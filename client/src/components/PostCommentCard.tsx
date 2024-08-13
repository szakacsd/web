import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

interface Comment {
    id: number;
    post_id: number;
    message: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface PostCommentCardProps {
    comment: Comment;
}

const PostCommentCard: React.FC<PostCommentCardProps> = ({ comment }) => {
    return (
        <div className="flex gap-4 py-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between">
                    <div className="font-semibold">{comment.email}</div>
                    <div className="text-muted-foreground">
                        {formatDistanceToNowStrict(new Date(comment.created_at), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
                <div className="text-muted-foreground">{comment.message}</div>
            </div>
        </div>
    );
};

export default PostCommentCard;

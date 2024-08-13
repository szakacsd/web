import React, { useState } from 'react';
import PostList from '../components/PostList';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultiSelect from '../components/MultiSelect';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useCreatePost } from '../hooks/useCreatePost';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { Textarea } from '@/components/ui/textarea';

const useTheme = (initialTheme: string = 'light') => {
    const [theme, setTheme] = React.useState(initialTheme);

    React.useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    return { theme, setTheme };
};

const ThemeToggle: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => (
    <Tabs className="flex items-center gap-4" defaultValue="light" onValueChange={onChange}>
        <TabsList className="flex items-center gap-4">
            <TabsTrigger className="text-sm" value="light">
                Light
            </TabsTrigger>
            <TabsTrigger className="text-sm" value="dark">
                Dark
            </TabsTrigger>
        </TabsList>
    </Tabs>
);

const PostsPage: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [selectedCategories, setSelectedCategories] = useState<{ label: string; value: string }[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories('categories');
    const { posts, loading: postsLoading, error: postsError, refetch } = useFetchPosts('posts');
    const { createPost, loading: createLoading, error: createError } = useCreatePost(refetch);

    const categoryOptions = categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
    }));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await createPost({
            title,
            content,
            categories: selectedCategories,
            author_first_name: author,
        });

        if (!createError) {
            setTitle('');
            setContent('');
            setAuthor('');
            setSelectedCategories([]);
            setDialogOpen(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center px-4 py-2 border-b pb-4">
                <div className="flex items-center gap-4 container">
                    <h1 className="text-xl font-bold">Posts</h1>
                    <div className="flex items-center gap-4 justify-end w-full">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setDialogOpen(true)}>Create new post</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create new post</DialogTitle>
                                    <DialogDescription>
                                        Fill in the form below to create a new post.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        name="author"
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                    <Label htmlFor="categories">Categories</Label>
                                    {categoriesLoading ? (
                                        <p>Loading categories...</p>
                                    ) : (
                                        <MultiSelect
                                            options={categoryOptions}
                                            value={selectedCategories}
                                            onChange={setSelectedCategories}
                                        />
                                    )}
                                    {categoriesError && <p className="text-red-500">{categoriesError.message}</p>}
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    <DialogFooter>
                                        <Button type="submit" disabled={createLoading}>
                                            {createLoading ? 'Saving...' : 'Save changes'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                                {createError && <p className="text-red-500">{createError.message}</p>}
                            </DialogContent>
                        </Dialog>
                        <ThemeToggle onChange={setTheme} />
                    </div>
                </div>
            </div>
            <PostList posts={posts} loading={postsLoading} error={postsError} refetch={refetch} />
        </div>
    );
};

export default PostsPage;

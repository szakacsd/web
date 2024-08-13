<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\ErrorResource;
use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    protected PostRepositoryInterface $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $posts = $this->postRepository->getAll();
        return PostResource::collection($posts->load(['categories', 'comments']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request): JsonResponse
    {
        $post = $this->postRepository.create($request->validated());

        if ($request->has('categories')) {
            $post->categories()->sync($request->categories);
        }

        return (new PostResource($post->load(['categories', 'comments'])))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): PostResource
    {
        return new PostResource($post->load(['categories', 'comments']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post): JsonResponse
    {
        $updated = $this->postRepository.update($post, $request->validated());

        if ($request->has('categories')) {
            $post->categories()->sync($request->categories);
        }

        if ($updated) {
            return (new PostResource($post->load(['categories', 'comments'])))
                ->response()
                ->setStatusCode(200);
        }

        return (new ErrorResource('Failed to update post'))
            ->response()
            ->setStatusCode(500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): JsonResponse
    {
        $deleted = $this->postRepository.delete($post);

        if ($deleted) {
            return response()->json(['message' => 'Post deleted successfully']);
        }

        return (new ErrorResource('Failed to delete post'))
            ->response()
            ->setStatusCode(500);
    }
}

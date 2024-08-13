<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Requests\CommentUpdateRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\ErrorResource;
use App\Repositories\Interfaces\CommentRepositoryInterface;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CommentController extends Controller
{
    protected CommentRepositoryInterface $commentRepository;

    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $comments = $this->commentRepository->getAll();
        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentStoreRequest $request): JsonResponse
    {
        $comment = $this->commentRepository->create($request->validated());

        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): CommentResource
    {
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentUpdateRequest $request, Comment $comment): JsonResponse
    {
        $updated = $this->commentRepository->update($comment, $request->validated());

        if ($updated) {
            return (new CommentResource($comment))
                ->response()
                ->setStatusCode(200);
        }

        return (new ErrorResource('Failed to update comment'))
            ->response()
            ->setStatusCode(500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $deleted = $this->commentRepository->delete($comment);

        if ($deleted) {
            return response()->json(['message' => 'Comment deleted successfully']);
        }

        return (new ErrorResource('Failed to delete comment'))
            ->response()
            ->setStatusCode(500);
    }
}

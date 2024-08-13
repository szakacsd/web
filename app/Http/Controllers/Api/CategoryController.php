<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ErrorResource;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    protected CategoryRepositoryInterface $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $categories = $this->categoryRepository->getAll();
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request): JsonResponse
    {
        $category = $this->categoryRepository->create($request->validated());

        return (new CategoryResource($category))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): CategoryResource
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category): JsonResponse
    {
        $updated = $this->categoryRepository->update($category, $request->validated());

        if ($updated) {
            return (new CategoryResource($category))
                ->response()
                ->setStatusCode(200);
        }

        return (new ErrorResource('Failed to update category'))
            ->response()
            ->setStatusCode(500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        $deleted = $this->categoryRepository->delete($category);

        if ($deleted) {
            return response()->json(['message' => 'Category deleted successfully']);
        }

        return (new ErrorResource('Failed to delete category'))
            ->response()
            ->setStatusCode(500);
    }
}

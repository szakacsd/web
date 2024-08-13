<?php

namespace App\Repositories\Interfaces;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface
{
    public function getAll(): Collection;
    public function create(array $data): Post;
    public function update(Post $post, array $data): bool;
    public function delete(Post $post): bool;
}

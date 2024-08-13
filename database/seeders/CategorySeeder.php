<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'A'],
            ['name' => 'B'],
            ['name' => 'C'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate($category);
        }
    }
}

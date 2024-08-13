<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class SetupDemo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setup:demo';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup the project with demo data';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        if (env('APP_ENV') !== 'local') {
            $this->error('This command can only be run in the local environment.');
            return;
        }

        // Migrate the database
        $this->info('Migrating the database... The database will be refreshed and erased.');
        if (! $this->confirm('Are you sure?')) {
            return;
        }

        Artisan::call('migrate:fresh');

        // Seed the database
        $this->info('Seeding the database...');
        Artisan::call('db:seed', ['--class' => 'CategorySeeder']);
        Artisan::call('db:seed', ['--class' => 'PostSeeder']);
        Artisan::call('db:seed', ['--class' => 'CommentSeeder']);

        $this->info('Demo setup completed successfully!');
    }
}

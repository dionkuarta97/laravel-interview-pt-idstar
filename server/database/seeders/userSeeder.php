<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            [
                'user_id' => 1,
                'username' => 'maker1',
                'password' => 'maker1',
                'role_id' => 1
            ], [
                'user_id' => 2,
                'username' => 'maker2',
                'password' => 'maker2',
                'role_id' => 1
            ], [
                'user_id' => 3,
                'username' => 'approver1',
                'password' => 'approver1',
                'role_id' => 2
            ], [
                'user_id' => 4,
                'username' => 'approver2',
                'password' => 'approver2',
                'role_id' => 2
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->insert([
            [
                'role_id' => 1,
                'role_name' => 'maker'
            ],
            [
                'role_id' => 2,
                'role_name' => 'approver'
            ]
        ]);
    }
}

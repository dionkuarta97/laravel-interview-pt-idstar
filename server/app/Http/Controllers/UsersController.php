<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function login(Request $request)
    {

        $validated = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validated->fails()) return response()->json($validated->errors(), 400);
        $users = Users::with('roles');

        $checkUser = $users->where('username', $request->username)->get();
        if (count($checkUser) == 0) return response()->json(['message' => 'wrong username/password'], 401);
        if ($checkUser[0]['password'] != $request->password) return response()->json(['message' => 'wrong username/password'], 401);

        $data = [
            'user_id' => $checkUser[0]['user_id'],
            'username' => $checkUser[0]['username'],
            'role' => $checkUser[0]['roles']['role_name'],
        ];

        $key = env('JWT_SECRET');
        $payload = JWT::encode($data, $key);

        return response()->json(['access_token' => $payload], 200);
    }

    public function getUsers(Request $request)
    {

        $user = $request->get('user');

        return response()->json($user, 200);
    }
}

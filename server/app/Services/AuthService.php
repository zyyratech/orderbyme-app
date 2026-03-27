<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService{
    public function register (array $data){
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $data['username'],
            'password' => Hash::make($data['password']),
        ]);
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return ['status' => 'success', 'message' => 'User registered successfully', 'user' => $user, 'token' => $token];
    }
    
    public function login (array $data){
        $user = User::where('username', $data['username'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return ['status' => 'success', 'message' => 'User logged in successfully','user' => $user, 'token' => $token];
    }
}

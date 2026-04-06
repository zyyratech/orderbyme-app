<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

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

    public function logout (User $user){
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $user->currentAccessToken();

        $token?->delete();
        
        return ['status' => 'success', 'message' => 'User logged out successfully'];
    }

    public function forgotPassword (array $data){
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['No user found with this email address.'],
            ]);
        }

        // Implement forgot password logic here (e.g., send reset link)

    }

    public function resetPassword (array $data){
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['No user found with this email address.'],
            ]);
        }

        // Implement reset password logic here (e.g., verify token and update password)

    }

}

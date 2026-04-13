<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

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

    public function sendResetLink (array $data){
        $status = Password::sendResetLink(
            ['email' => $data['email']]
        );
        return[
            'status' => $status == Password::RESET_LINK_SENT ? 'success' : 'error',
            'message' => $status == Password::RESET_LINK_SENT ? 'Reset link sent successfully' : 'Failed to send reset link'
        ];
    }

    public function forgotPassword (array $data){
        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['No user found with this email address.'],
            ]);
        }

        $status = Password::sendResetLink(
            ['email' => $data['email']]
        );
        return[
            'status' => $status == Password::RESET_LINK_SENT ? 'success' : 'error',
            'message' => $status == Password::RESET_LINK_SENT ? 'Reset link sent successfully' : 'Failed to send reset link'
        ];

    }

    public function resetPassword (array $data){
       $status = Password::reset(
            $data,
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return [
            'status' => $status == Password::PASSWORD_RESET ? 'success' : 'error',
            'message' => $status == Password::PASSWORD_RESET ? 'Password reset successfully' : 'Failed to reset password'
        ];

    }

}

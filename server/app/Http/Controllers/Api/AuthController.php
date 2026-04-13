<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Validated;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $valdatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        return response()->json($this->authService->register($valdatedData), 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        
        return response()->json($this->authService->login($validated), 200);
    }

    public function logout(Request $request)
    {
        return response()->json($this->authService->logout($request->user()), 200);
    }
    

    public function forgotPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
        ]);
        
        try{
            $result = $this->authService->sendResetLink($validated);
            return response()->json($result);        // return response()->json($this->authService->sendResetLink($validated), 200);    
        }catch(\Exception $e){
            return response()->json(['status' => 'error', 'message' => 'An error occurred while sending reset link'], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try{
            $result = $this->authService->resetPassword($validated);

            if($result['status'] === 'error'){
                return response()->json($result,422);
            }
            return response()->json($result,200);        // return response()->json($this->authService->resetPassword($validated), 200);
        }catch(\Exception $e){
            return response()->json(['status' => 'error', 'message' => 'An error occurred while resetting password'], 500);
        }

    }

}

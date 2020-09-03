<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\User;

class AuthController extends Controller
{
    //

    public function register(Request $request){
        
        $validatedData = $request->validate([
            'name'=>'required|string|max:55',
            'email'=>'email|required|max:200|unique:users',
            'password'=>'required|string|confirmed'
        ]);
        // $validator= Validator::make($request->all(),[
        //     'name'=>'required|string|max:55',
        //     'email'=>'email|required|max:200|unique:users',
        //     'password'=>'required|string|confirmed'
        // ]);
        //error_log($validator->errors());
        // if($validator->fails()){
        //     //error_log($validator->errors()->all());
        //     return response()->json(['errors'=>$validator->errors()->all()]);
        // }

        //$request['password'] = Hash::make($request['password']);
        //$request['password']= bcrypt($request['password']);
        $validatedData['password'] = bcrypt($validatedData['password']);


       
       // $user = User::create($request->toArray());
       $user = User::create($validatedData);
        $access_token = $user->createToken('authToken')->accesToken;
        return response()->json(['user'=>$user,'access_token'=>$access_token]);


    }

    public function login(Request $request){
        $loginData = $request->validate([
            'email'=>'email|required|max:200',
            'password'=>'required'
        ]);
          
        
        if(!auth()->attempt($loginData)){
            return response()->json(['status_code'=>404,'text'=>'Bad credentials']);
        }
        $access_token=auth()->user()->createToken('authToken')->accessToken;
        return response()->json(['status_code'=>200,'user'=>auth()->user(),'access_token'=>$access_token]);
    }

}

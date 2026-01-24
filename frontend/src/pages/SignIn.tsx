import { Button } from "../components/Button";
import { InputForm } from "../components/InputForm";
import { AnimatedBackground } from "../components/AnimatedBackground";
import {useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_backend_url;

export function SignIn(){
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = userRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            const output = await axios.post(`${backend_url}/signin`,{
                username,
                password
            });
            console.log(output);
            const jwt_token = output.data.token;
            localStorage.setItem("token",jwt_token);
            alert(output.data.msg);
            navigate("/dashboard");
            window.location.reload();

        }catch(err: unknown){
            if(axios.isAxiosError(err)){
                console.log(err);
                alert(`${err.response?.data.msg}`);
            }else if(err instanceof Error){
                alert(`${err.message}`);
            }else{
                alert("An unknown error occurred.");
            }
        }

    }
    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-linear-to-br from-slate-950 via-purple-950 to-slate-900">
            <AnimatedBackground />
            <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">Welcome Back</h1>
                    <p className="text-sm text-gray-300">Sign in to access your content.</p>
                </div>

                <div className="space-y-3">
                    <InputForm ref={userRef} additional="text-white" placeholder="Username" id="username" />
                    <InputForm ref={passwordRef} additional="text-white" placeholder="Password" id="password" type="password" />
                </div>

                <Button variant="primary" size="md" text="Sign In" onClick={signin} additional="w-full justify-center" />
            </div>
            </div>
        </div>
    )
}
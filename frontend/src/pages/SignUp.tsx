import { Button } from "../components/Button";
import { InputForm } from "../components/InputForm";

export function SignUp(){
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="space-y-1 text-center">
                    <h1 className="text-xl font-semibold text-gray-900">Create your account</h1>
                    <p className="text-sm text-gray-500">Join to save and revisit your content.</p>
                </div>

                <div className="space-y-3">
                    <InputForm placeholder="Username" id="username" />
                    <InputForm placeholder="Password" id="password" type="password" />
                </div>

                <Button variant="primary" size="md" text="Sign Up" onClick={() => {}} additional="w-full justify-center" />
            </div>
        </div>
    )
}
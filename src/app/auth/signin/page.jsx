"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
            } else {
                toast.success("Signed in successfully! Redirecting...", {
                    duration: 1500,
                    position: "top-center",
                });

                setEmail("");
                setPassword("");

                setTimeout(() => {
                    router.push(redirectTo);
                }, 1000);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        setError("");
        setIsGoogleLoading(true); // ← was missing
        try {
            await authClient.signIn.social({ // ← use authClient, not signIn
                provider: "google",
                callbackURL: redirectTo,
            });
        } catch (err) {
            setError("Failed to initialize Google login.");
            setIsGoogleLoading(false); // ← only reset on error; success redirects away
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 transition-colors duration-300">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Welcome back</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Sign in to continue to AuraNex Connect</p>
                </div>

                <div className="mb-2 flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="bordered"
                        className="w-full font-medium rounded-xl text-sm h-11 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors gap-2"
                        onClick={handleGoogleSignin}
                    >
                        {!isGoogleLoading && <FcGoogle size={20} />}
                        Sign in with Google
                    </Button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                        <span className="flex-shrink mx-4 text-xs text-zinc-400 uppercase tracking-wider">Or continue with</span>
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                    </div>
                </div>

                <form onSubmit={handleSignin} className="flex flex-col gap-5">
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                            <Link href="/auth/forgot-password" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 transition-all">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold rounded-xl text-sm h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                        isLoading={isLoading}
                        isDisabled={isLoading || isGoogleLoading}
                    >
                        Sign In
                    </Button>

                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Don&apos;t have an account?{" "}
                        <Link href={`/auth/signup?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            Create one now
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}

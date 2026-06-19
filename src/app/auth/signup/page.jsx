"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole, Link as LinkIcon } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("seeker");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validatePassword = (pass) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;
        return passwordRegex.test(pass);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long and contain at least one number and one special character.");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                image: photoUrl,
                role,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPhotoUrl("");
                setPassword("");
                
                setTimeout(() => {
                    router.push(redirectTo);
                }, 1500);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-955 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

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

                    <TextField name="photoUrl" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Photo URL</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <LinkIcon className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="url"
                                placeholder="https://example.com/your-photo.jpg"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a strong password"
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
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                            Min. 6 characters, must include 1 number and 1 special symbol.
                        </p>
                    </TextField>

                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">I want to join as</Label>
                        <RadioGroup defaultValue="seeker" name="role" onChange={(value) => setRole(value)} orientation="horizontal">
                            <Radio value="seeker">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-sm cursor-pointer">Job Seeker</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="recruiter">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-sm cursor-pointer">Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 transition-all">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 transition-all">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold rounded-xl text-sm h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign Up
                    </Button>

                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href={`/auth/signin?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            Sign in instead
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
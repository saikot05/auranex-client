"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { Person, PencilToLine, Lock, Check, Eye, EyeSlash, ShieldCheck } from "@gravity-ui/icons";
import toast from "react-hot-toast";

const ROLE_COLORS = {
    admin: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/40",
    doctor: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/40",
    patient: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/40",
};

export default function ProfileSettingsPage() {
    const { data: session, isPending, refetch } = useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
    if (user && !initialized) {
        setName(user.name || "");
        setImageUrl(user.image || "");
        setInitialized(true);
        }
    }, [user, initialized]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Name cannot be empty.");
        setSavingProfile(true);
        try {
            await authClient.updateUser({ name, image: imageUrl });
            await refetch?.();
            toast.success("Profile updated!");
        } catch {
            toast.error("Failed to update profile.");
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
        if (newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
        setSavingPassword(true);
        try {
            await authClient.changePassword({ currentPassword, newPassword });
            setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
            toast.success("Password changed successfully!");
        } catch {
            toast.error("Failed to change password. Check your current password.");
        } finally {
            setSavingPassword(false);
        }
    };

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : null;

    const role = user?.role || "patient";

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Profile Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your personal information and account security.</p>
                </div>

                {/* Identity Card */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/70 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative shrink-0">
                        <Avatar
                            src={imageUrl || user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=3B82F6&color=fff&size=128`}
                            className="w-20 h-20 border-4 border-blue-500/30"
                        />
                        <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-white dark:border-[#111827] rounded-full" title="Online" />
                    </div>
                    <div className="text-center sm:text-left space-y-1.5 flex-1">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{user?.name || "User"}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-1">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${ROLE_COLORS[role]}`}>
                                {role}
                            </span>
                            {joinedDate && (
                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                    Member since {joinedDate}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-full font-semibold self-start">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                    </div>
                </div>

                {/* Personal Info Form */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/70 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/60">
                        <Person className="w-4 h-4 text-blue-500" />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Personal Information</h3>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Profile Photo URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
                                />
                                {imageUrl && (
                                    <Avatar src={imageUrl} className="w-10 h-10 shrink-0 border border-slate-200 dark:border-slate-700" />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</label>
                                <input
                                    type="text"
                                    value={role.charAt(0).toUpperCase() + role.slice(1)}
                                    disabled
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed capitalize"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Status</label>
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/40">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-sm text-slate-400 dark:text-slate-500">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={savingProfile}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-blue-600/10"
                            >
                                {savingProfile ? (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                {savingProfile ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Change Form */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/70 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/60">
                        <Lock className="w-4 h-4 text-blue-500" />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Change Password</h3>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        {[
                            { label: "Current Password", value: currentPassword, setter: setCurrentPassword, show: showCurrent, toggle: () => setShowCurrent(p => !p) },
                            { label: "New Password", value: newPassword, setter: setNewPassword, show: showNew, toggle: () => setShowNew(p => !p) },
                            { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, show: showConfirm, toggle: () => setShowConfirm(p => !p) },
                        ].map(({ label, value, setter, show, toggle }) => (
                            <div key={label} className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>
                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        value={value}
                                        onChange={(e) => setter(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 pr-11 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggle}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                                    >
                                        {show ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {newPassword && (
                            <div className="flex gap-1.5 items-center text-xs">
                                <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 6 ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />
                                <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 8 ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />
                                <div className={`h-1 flex-1 rounded-full ${/[^a-zA-Z0-9]/.test(newPassword) ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />
                                <span className="text-slate-400 dark:text-slate-500 ml-1">
                                    {newPassword.length < 6 ? "Weak" : newPassword.length < 8 ? "Fair" : "Strong"}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={savingPassword}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-blue-600/10"
                            >
                                {savingPassword ? (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <PencilToLine className="w-4 h-4" />
                                )}
                                {savingPassword ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
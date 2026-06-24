"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { useTheme } from "next-themes";
import { HeartPulse, ChevronDown, Sun, Moon } from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = session?.user;
  const userRole = user?.role || "patient";

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

 useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dashboardLinks = {
    patient: "/dashboard/patient",
    doctor: "/dashboard/doctor",
    admin: "/dashboard/admin",
  };

  const currentDashboardHref = dashboardLinks[userRole] || "/dashboard";

  const navLinks = useMemo(() => [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/find-doctors" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ], []);

  const handleLogOut = async () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-500/10 dark:border-blue-500/20 bg-blue-50/80 dark:bg-[#0B132B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
            <HeartPulse className="text-white h-5 w-5 animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-[length:200%_auto] animate-text whitespace-nowrap">
            Auranex
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex items-center gap-1 rounded-full border border-blue-500/10 dark:border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 px-2 py-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-200 transition hover:bg-blue-500/10 hover:text-blue-900 dark:hover:text-blue-50 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 rounded-full"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="h-6 w-px bg-blue-500/20 dark:bg-blue-500/30" />

          <div className="flex items-center gap-3">
            {isPending ? null : user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 cursor-pointer outline-none bg-transparent border-none p-0"
                >
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-200 whitespace-nowrap">
                    Hi, {user.name || "User"}!
                  </span>
                  <Avatar
                    className="w-9 h-9 border-2 border-blue-500"
                    color="primary"
                    src={user.image || user.photo || user.photoURL || `https://i.ibb.co.com/s9NDQSpj/mohamad-azaam-1-O8-CJy1-A7-Wo-unsplash.jpg`}
                  />
                  <ChevronDown
                    className={`text-blue-400 h-3.5 w-3.5 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+12px)] w-52 rounded-xl border border-blue-500/10 dark:border-blue-500/20 bg-white dark:bg-[#0B132B] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top z-[999] ${
                    isProfileOpen
                      ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-1.5 flex flex-col">
                    <Link
                      href={currentDashboardHref}
                      onClick={() => setIsProfileOpen(false)}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium text-blue-800 dark:text-blue-200 hover:bg-blue-500/10 transition-colors"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium text-blue-800 dark:text-blue-200 hover:bg-blue-500/10 transition-colors"
                    >
                      Profile Settings
                    </Link>
                    <div className="my-1 border-t border-blue-500/10 dark:border-blue-500/20" />
                    <button
                      onClick={handleLogOut}
                      className="rounded-lg px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors text-left"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin" className="text-sm font-semibold text-blue-600 dark:text-blue-400 px-3 py-2 hover:opacity-80 transition whitespace-nowrap">
                  Login
                </Link>
                <Link href="/auth/signup">
                  <Button size="md" radius="lg" className="bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-blue-600 dark:text-blue-400 rounded-full"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-xl p-2 text-blue-900 dark:text-blue-50 transition hover:bg-blue-500/10"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <div className="border-t border-blue-500/10 dark:border-blue-500/20 bg-white dark:bg-[#0B132B] lg:hidden absolute left-0 w-full shadow-2xl z-50">
          <div className="space-y-2 px-4 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-blue-700 dark:text-blue-200 transition hover:bg-blue-500/5 hover:text-blue-900 dark:hover:text-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!isPending && user && (
                <>
                  <li>
                    <Link
                      href={currentDashboardHref}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-blue-700 dark:text-blue-200 transition hover:bg-blue-500/5 hover:text-blue-900 dark:hover:text-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="block rounded-xl px-4 py-3 text-base font-medium text-blue-700 dark:text-blue-200 transition hover:bg-blue-500/5 hover:text-blue-900 dark:hover:text-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="border-t border-blue-500/10 dark:border-blue-500/20 pt-4">
              <div className="flex flex-col gap-2.5">
                {!isPending && user ? (
                  <div className="flex flex-col gap-2 px-4">
                    <span className="text-xs text-blue-500/70 font-semibold">
                      Signed in as: <span className="text-sm font-bold text-blue-900 dark:text-blue-200">{user.name || "User"}</span>
                    </span>
                    <Button onClick={handleLogOut} color="danger" variant="flat" className="w-full mt-2 font-semibold">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="rounded-xl text-center py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-500/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link href="/auth/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 text-white font-semibold py-6 text-base" radius="xl">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

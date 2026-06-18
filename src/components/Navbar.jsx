"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { useTheme } from "next-themes";
import { HeartPulse, ChevronDown, Sun, Moon } from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [userRole] = useState("Patient");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Doctors", href: "/doctors" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const dashboardLinks = {
    Patient: "/dashboard/patient",
    Doctor: "/dashboard/doctor",
    Admin: "/dashboard/admin",
  };

  if (isLoggedIn) {
    if (!navLinks.some(link => link.label === "Dashboard")) {
      navLinks.push({
        label: "Dashboard",
        href: dashboardLinks[userRole] || "/dashboard",
      });
    }
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-500/10 dark:border-blue-500/20 bg-blue-50/80 dark:bg-[#0B132B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
            <HeartPulse className="text-white h-5 w-5 animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-[length:200%_auto] animate-text whitespace-nowrap">
            Auranex
          </span>
        </Link>

        {/* Desktop Links */}
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

          {/* Theme Toggle Button - Fixed Hydration Mismatch */}
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

          {/* User Auth Info */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    {/* Fixed: button wrapping standard custom nested attribute error resolved */}
                    <div className="flex items-center gap-1 opacity-90 hover:opacity-100 cursor-pointer outline-none">
                      <Avatar
                        isBordered
                        className="w-9 h-9 border-2 border-blue-500"
                        color="primary"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                      <ChevronDown className="text-blue-400 h-3.5 w-3.5" />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="User Actions" 
                    variant="flat"
                    className="bg-white dark:bg-[#0B132B] border border-blue-500/10 dark:border-blue-500/20 rounded-xl p-1.5 shadow-2xl !absolute !z-[100] min-w-[200px]"
                  >
                    <DropdownItem key="profile_info" className="h-14 gap-2 border-b border-divider/50 mb-1" textValue="Profile Info">
                      <p className="font-semibold text-xs text-blue-500/70">Signed in as</p>
                      <p className="font-bold text-sm text-blue-900 dark:text-blue-200">user@medicare.com</p>
                    </DropdownItem>
                    <DropdownItem key="my_dashboard" href={dashboardLinks[userRole]} textValue="Dashboard" className="text-blue-800 dark:text-blue-200">
                      My Dashboard
                    </DropdownItem>
                    <DropdownItem key="my_profile" href="/dashboard/profile" textValue="Profile Settings" className="text-blue-800 dark:text-blue-200">
                      Profile Settings
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" className="text-danger font-semibold" onClick={handleLogOut} textValue="Log Out">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-sm font-semibold text-blue-600 dark:text-blue-400 px-3 py-2 hover:opacity-80 transition whitespace-nowrap">
                  Login
                </Link>
                <Button as={Link} href="/register" size="md" radius="lg" className="bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/10 hover:bg-blue-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-blue-600 dark:text-blue-400 rounded-full"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isLoggedIn && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="cursor-pointer outline-none">
                  <Avatar isBordered className="w-8 h-8 border-2 border-blue-500" color="primary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Mobile User Actions" className="bg-white dark:bg-[#0B132B] border border-blue-500/10 !absolute !z-[100] p-1 shadow-xl rounded-xl min-w-[160px]">
                <DropdownItem key="my_dashboard" href={dashboardLinks[userRole]}>My Dashboard</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleLogOut}>Log Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-xl p-2 text-blue-900 dark:text-blue-50 transition hover:bg-blue-500/10"
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

      {/* Mobile Drawer */}
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
            </ul>

            {!isLoggedIn && (
              <div className="border-t border-blue-500/10 dark:border-blue-500/20 pt-4 flex flex-col gap-2.5">
                <Link
                  href="/login"
                  className="rounded-xl text-center py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-500/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Button
                  as={Link}
                  href="/register"
                  className="bg-blue-600 text-white font-semibold py-6 text-base"
                  radius="xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
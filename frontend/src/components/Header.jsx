import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import { NavLink } from "react-router";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-zinc-700 dark:text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </NavLink>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                About
              </NavLink>
              <NavLink
                to="/task"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Task
              </NavLink>
              <NavLink
                to="/contact"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Contact
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="@user"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink to="/login">
                    <Button variant="ghost">Log in</Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button>Sign up</Button>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink
            to="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-900 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Contact
          </NavLink>
        </div>
        <div className="border-t border-zinc-200 pb-3 pt-4 dark:border-zinc-700">
          <div className="flex items-center px-5">
            {isLoggedIn ? (
              <>
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="@user"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                    User Name
                  </div>
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    user@example.com
                  </div>
                </div>
              </>
            ) : (
              <div className="flex w-full space-x-4">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Log in
                </Button>
                <Button className="flex-1" onClick={() => setIsLoggedIn(true)}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
          {isLoggedIn && (
            <div className="mt-3 space-y-1 px-2">
              <Button variant="ghost" className="w-full justify-start">
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsLoggedIn(false)}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

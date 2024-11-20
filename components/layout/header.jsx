import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Search, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { status,data:session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(
    status === "authenticated" ? true : false
  );
  const [activePage, setActivePage] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleAuth = () => signOut();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Home",
      href: "/",
    },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                💪 Fitness Club
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((page) => (
              <Link
                key={page.name + Math.random()}
                href={page.href}
                className={`hover:text-blue-400 transition-colors ${
                  activePage === page
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-300"
                }`}
                onClick={() => setActivePage(page.name)}
              >
                {page.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 text-white border-gray-700">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-gray-700 cursor-pointer"
                    onClick={toggleAuth}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
              <Link href="/auth/login" passHref>
                <Button
                  as="a" // If `Button` supports this, render it as an anchor tag.
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" passHref>
                <Button
                  as="a"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navItems.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`hover:text-blue-400 transition-colors ${
                    activePage === page ? "text-blue-400" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setActivePage(page.name);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {page.name}
                </Link>
              ))}
            </nav>
            {!isAuthenticated && (
              <div className="mt-4 flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800 justify-start"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

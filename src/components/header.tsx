"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut, Plus, Star } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isAdmin = session?.user?.role === "admin"
  const isPremium = session?.user?.role === "premium"

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Food Spots", href: "/posts" },
    { name: "Search", href: "/search" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">StreetFood</span>
        </Link>

        <div className="hidden md:flex md:flex-1">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isPremium && (
              <Link
                href="/premium-spots"
                className={`flex items-center transition-colors hover:text-foreground/80 ${
                  pathname === "/premium-spots" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                Premium Spots
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/admin"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === "/admin" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {session ? (
            <>
              <Link href="/posts/new" className="hidden md:block">
                <Button size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-posts">My Posts</Link>
                  </DropdownMenuItem>
                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link href="/premium">
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:block">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="mr-2">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isPremium && (
                  <Link
                    href="/premium-spots"
                    className="flex items-center text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    Premium Spots
                  </Link>
                )}
                {isAdmin && (
                  <Link href="/admin" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Admin
                  </Link>
                )}
                {session ? (
                  <>
                    <Link
                      href="/posts/new"
                      className="flex items-center text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Post
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link href="/my-posts" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      My Posts
                    </Link>
                    {!isPremium && (
                      <Link
                        href="/premium"
                        className="flex items-center text-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        Upgrade to Premium
                      </Link>
                    )}
                    <button
                      className="flex items-center text-lg font-medium"
                      onClick={() => {
                        setIsOpen(false)
                        signOut({ callbackUrl: "/" })
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/auth/login" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link href="/auth/register" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

"use client";

import { doLogout } from "@/app/(mainLayout)/auth/_actions/login.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROLES } from "@/lib/const";
import { cn } from "@/lib/utils";
import {
  Globe,
  Heart,
  Home,
  Info,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  User,
} from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../logo";
import { DropdownMegaMenu } from "./dropdown-mega-menu";
import { NavbarSearch } from "./navbar-search";

export const MotionLink = motion.create(Link);

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const isAdmin = session?.user?.role === ROLES.ADMIN;
  const isPremium = session?.user?.role === ROLES.PREMIUM;

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Food Spots", href: "/posts", icon: Globe },
    { name: "Search", href: "/search", icon: Search },
    { name: "Pricing", href: "/pricing", icon: Star },
    { name: "Blog", href: "/blog", icon: MessageSquare },
    { name: "About", href: "/about", icon: Info },
  ];

  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-cyan-900/50 bg-slate-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/80 shadow-[0_2px_10px_rgba(0,224,255,0.1)]"
          : "bg-slate-900"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />

        <div className="hidden flex-1 md:flex">
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {navigation.map((item, i) => (
              <MotionLink
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-9 items-center rounded-md px-3 text-sm transition-colors hover:bg-accent/50",
                  pathname === item.href
                    ? "bg-accent/50 text-accent-foreground font-medium"
                    : "text-foreground/60"
                )}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                custom={i}
              >
                {item.name}
              </MotionLink>
            ))}

            <DropdownMegaMenu />

            {isPremium && (
              <motion.div
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                custom={navigation.length + 1}
              >
                <Link
                  href="/premium-spots"
                  className={cn(
                    "flex h-9 items-center rounded-md px-3 text-sm transition-colors hover:bg-accent/50",
                    pathname === "/premium-spots"
                      ? "bg-accent/50 text-accent-foreground font-medium"
                      : "text-foreground/60"
                  )}
                >
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  Premium Spots
                </Link>
              </motion.div>
            )}

            {isAdmin && (
              <motion.div
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                custom={navigation.length + 2}
              >
                <Link
                  href="/admin"
                  className={cn(
                    "flex h-9 items-center rounded-md px-3 text-sm transition-colors hover:bg-accent/50",
                    pathname === "/admin"
                      ? "bg-accent/50 text-accent-foreground font-medium"
                      : "text-foreground/60"
                  )}
                >
                  Admin
                </Link>
              </motion.div>
            )}
          </nav>
        </div>

        <motion.div
          className="flex items-center justify-end space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="hidden sm:block">
            <NavbarSearch />
          </div>

          {session ? (
            <>
              <Link href="/posts/new" className="hidden md:block">
                <Button className="gap-1" size="sm" variant="secondary">
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || undefined}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary-100 text-primary-800">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {isPremium && (
                      <Badge
                        className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-yellow-500 p-0"
                        variant="outline"
                      >
                        <Star className="h-3 w-3 text-white" />
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-3 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={session.user?.image || undefined}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary-100 text-primary-800">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex cursor-pointer items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/my-posts"
                      className="flex cursor-pointer items-center"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      My Posts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/favorites"
                      className="flex cursor-pointer items-center"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex cursor-pointer items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/pricing"
                        className="flex cursor-pointer items-center"
                      >
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden space-x-2 md:block">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="h-8">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="h-8" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l">
              <div className="mb-6 flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    SF
                  </div>
                </div>
                <div className="font-bold tracking-tight">
                  <span className="text-primary-500">Street</span>
                  <span>Foodie</span>
                </div>
              </div>

              <nav className="flex flex-col gap-4">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50",
                        pathname === item.href
                          ? "bg-accent/50 text-accent-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {isPremium && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navigation.length * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href="/premium-spots"
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50",
                        pathname === "/premium-spots"
                          ? "bg-accent/50 text-accent-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Star className="h-4 w-4 text-yellow-500" />
                      Premium Spots
                    </Link>
                  </motion.div>
                )}

                {!isPremium && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navigation.length * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href="/pricing"
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50",
                        pathname === "/pricing"
                          ? "bg-accent/50 text-accent-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Star className="h-4 w-4 text-yellow-500" />
                      Pricing Plans
                    </Link>
                  </motion.div>
                )}

                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: (navigation.length + 1) * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href="/admin"
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50",
                        pathname === "/admin"
                          ? "bg-accent/50 text-accent-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  </motion.div>
                )}

                {session ? (
                  <>
                    <motion.div
                      className="my-2 h-px bg-border"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        delay: (navigation.length + 2) * 0.05,
                        duration: 0.3,
                      }}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (navigation.length + 3) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href="/posts/new"
                        className="flex items-center gap-3 rounded-md bg-primary/10 px-2 py-1.5 text-sm font-medium text-primary-700 transition-colors hover:bg-primary/20"
                        onClick={() => setIsOpen(false)}
                      >
                        <Plus className="h-4 w-4" />
                        New Post
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (navigation.length + 4) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (navigation.length + 5) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href="/my-posts"
                        className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50"
                        onClick={() => setIsOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        My Posts
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (navigation.length + 6) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50"
                        onClick={() => setIsOpen(false)}
                      >
                        <Heart className="h-4 w-4" />
                        Favorites
                      </Link>
                    </motion.div>

                    {!isPremium && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (navigation.length + 7) * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href="/premium"
                          className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50"
                          onClick={() => setIsOpen(false)}
                        >
                          <Star className="h-4 w-4 text-yellow-500" />
                          Upgrade to Premium
                        </Link>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (navigation.length + 8) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <button
                        className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                        onClick={async () => {
                          setIsOpen(false);
                          await doLogout();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="my-2 h-px bg-border"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        delay: (navigation.length + 2) * 0.05,
                        duration: 0.3,
                      }}
                    />
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: (navigation.length + 3) * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href="/auth/login"
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-center text-sm transition-colors hover:bg-accent/50"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm text-primary-foreground transition-colors hover:bg-primary/90"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </motion.div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  );
}

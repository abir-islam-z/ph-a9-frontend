"use client";

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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ROLES } from "@/lib/const";
import {
  Heart,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const MotionLink = motion.create(Link);

export default function DashboardHeader({
  session,
}: {
  session: Session | null;
}) {
  const isPremium = session?.user?.role === ROLES.PREMIUM;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-slate-900">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center justify-end space-x-3">
          <Link href="/dashboard/posts/new" className="hidden md:block">
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
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-800">
                    {session?.user?.name?.charAt(0) || "U"}
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
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-800">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5 leading-none">
                  <p className="font-medium">{session?.user?.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session?.user?.email}
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
        </div>
      </div>
    </header>
  );
}

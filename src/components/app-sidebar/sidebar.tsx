import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "next-auth";
import { navItems } from "./navItems";

export default function SidebarMain({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Button
            size="lg"
            variant="ghost"
            className="w-full justify-start pl-2"
          >
            <Logo />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navItems ?? []} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user ?? null} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <>{children}</>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";
import Link from "next/link";
import {
  Building2Icon,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { TUser } from "@/types/type";
import { getInitials } from "@/utils/getInitials";
import { logout } from "@/services/logout";

export function Navbar({ user }: { user?: TUser }) {
  const router = useRouter();

  const userData = user?.data?.user;
  const userName = userData?.name || "User";
  const userEmail = userData?.email || "";
  const userRole = userData?.role;
  const userAvatar = userData?.profile?.profilePhoto || "";

  let dashboard = "/";
  if (userRole === "TENANT") {
    dashboard = "tenant-dashboard";
  }
  if (userRole === "LANDLORD") {
    dashboard = "landlord-dashboard";
  }
  if (userRole === "ADMIN") {
    dashboard = "admin-dashboard";
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    userRole ? { label: "Dashboard", href: `/${dashboard}` } : null,
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ].filter(Boolean);

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* লোগো */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold text-xl"
        >
          <Building2Icon className="h-6 w-6 text-green-600" />
          <span>
            Rent<span className="text-green-600">Nest</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item?.href}
              href={item?.href || "#"}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item?.label}
            </Link>
          ))}
        </nav>

        {user?.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open user menu"
            >
              <Avatar className="size-9 cursor-pointer">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {userEmail}
                    </span>
                    <span className="text-xs font-semibold capitalize text-primary">
                      {userRole}
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUserMenuAction("logout")}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

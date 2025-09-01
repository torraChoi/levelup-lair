import { useState } from "react";
import { Bell, Search, Settings, User, Sun, Moon, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [darkMode, setDarkMode] = useState(true);
  
  // Mock user data - will be replaced with real data from Supabase
  const userLevel = 12;
  const userXP = 2840;
  const userCoins = 150;
  const nextLevelXP = Math.floor(100 * Math.pow(userLevel + 1, 1.5));

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, projects..."
              className="pl-10 w-64 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* XP Progress */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="level-badge text-xs">
                LVL {userLevel}
              </Badge>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full xp-bar transition-all duration-500"
                      style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {userXP}/{nextLevelXP}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 coin-glow" />
              <span className="text-sm font-medium text-warning">{userCoins}</span>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              3
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>TF</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border z-50" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">TaskFlow User</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    user@taskflow.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
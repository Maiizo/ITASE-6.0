import { Search, Plus, User, Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface HeaderProps {
  onCreatePost: () => void;
  onSearch: (query: string) => void;
  onGoToAccount?: () => void;
  user?: {
    name: string;
    avatar?: string;
    notifications: number;
  };
}

export function Header({ onCreatePost, onSearch, onGoToAccount, user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">MH</span>
            </div>
            <h1 className="hidden sm:block">MindConnect</h1>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-9"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onCreatePost} className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {user.notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {user.notifications}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded-full"
                onClick={onGoToAccount}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-background px-8">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Cari anggota, event, atau dokumen..." 
            className="w-full rounded-full bg-muted/50 pl-9 border-none focus-visible:ring-1" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <div className="flex items-center gap-3 border-l pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none">Provokasi-Admin Apps</p>
            <p className="text-xs text-muted-foreground mt-1">System Administrator</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@admin" />
            <AvatarFallback>PA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

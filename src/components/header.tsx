import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ShoppingCart, User } from 'lucide-react';

// Placeholder SVG for Apollo Logo
const ApolloLogo = () => (
  <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Simplified representation - replace with actual logo SVG if available */}
    <rect width="140" height="40" rx="4" fill="hsl(var(--primary))"/>
    <text x="10" y="28" fontFamily="Arial, sans-serif" fontSize="20" fill="hsl(var(--primary-foreground))" fontWeight="bold">Apollo 24|7</text>
  </svg>
);


const Header = () => {
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-4">
        {/* Logo and Location (simplified) */}
        <div className="flex items-center gap-4">
           <ApolloLogo />
          {/* Location Selector Placeholder */}
           <Button variant="ghost" className="text-sm hidden md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Select Location
          </Button>
        </div>

         {/* Search Bar (simplified) */}
         <div className="relative flex-1 max-w-lg hidden md:flex">
           <Input
            type="search"
            placeholder="Search medicines, health products, doctors..."
            className="pl-10 pr-4 py-2 text-sm w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        {/* Right Side Icons/Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Navigation Links (Placeholders) */}
           <Button variant="link" className="text-sm text-foreground hover:text-primary p-0 hidden lg:block">
             Doctors
           </Button>
           <Button variant="link" className="text-sm text-foreground hover:text-primary p-0 hidden lg:block">
             Pharmacy
           </Button>
           <Button variant="link" className="text-sm text-foreground hover:text-primary p-0 hidden lg:block">
             Lab Tests
           </Button>
           <Button variant="link" className="text-sm text-foreground hover:text-primary p-0 hidden lg:block">
             Circle
           </Button>

           {/* Cart Icon */}
           <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            <span className="sr-only">View Cart</span>
          </Button>

           {/* User Profile/Login */}
           <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
          {/* Or Avatar if logged in */}
          {/* <Avatar className="h-8 w-8">
             <AvatarImage src="https://picsum.photos/40/40" alt="User Avatar" />
             <AvatarFallback>U</AvatarFallback>
           </Avatar> */}

           {/* Hamburger menu for mobile (placeholder) */}
           <Button variant="ghost" size="icon" className="md:hidden">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
             <span className="sr-only">Menu</span>
           </Button>
        </div>

         {/* Search Bar for mobile (visible below on smaller screens) */}
         <div className="relative w-full md:hidden mt-3">
           <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 text-sm w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

      </div>
    </header>
  );
};

export default Header;

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, MessageSquare, User } from "lucide-react";
import pallinLogo from "@/assets/pallin.svg";

export const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/activities", label: "Activities", icon: Calendar },
    { path: "/connect", label: "Connect", icon: Users },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={pallinLogo} alt="Pallin" className="h-10" />
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <Link to="/profile">
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

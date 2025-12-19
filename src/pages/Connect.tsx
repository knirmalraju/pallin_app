import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import connectImg from "@/assets/connect-illustration.jpg";

const mockUsers = [
  {
    id: 1,
    name: "Sarah Martinez",
    location: "Downtown",
    interests: ["Hiking", "Photography", "Coffee"],
    bio: "Recently moved here for work. Love exploring new places and meeting people!",
    initials: "SM",
  },
  {
    id: 2,
    name: "James Chen",
    location: "Midtown",
    interests: ["Gaming", "Tech", "Food"],
    bio: "Software developer looking to expand my social circle and try new restaurants.",
    initials: "JC",
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Westside",
    interests: ["Yoga", "Art", "Books"],
    bio: "Art teacher new to the area. Always up for cultural events and book clubs!",
    initials: "EW",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    location: "East End",
    interests: ["Sports", "Music", "Cooking"],
    bio: "Former chef turned foodie. Looking for workout buddies and concert companions.",
    initials: "MR",
  },
];

const Connect = () => {
  const navigate = useNavigate();
  const { addConnection } = useApp();

  const handleConnect = () => {
    addConnection();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Your People</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with others who share your interests and are also new to the area
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {user.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{user.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    variant="default" 
                    size="sm"
                    onClick={handleConnect}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-2xl p-8 text-center">
          <img 
            src={connectImg} 
            alt="People connecting" 
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6 border-4 border-primary/20"
          />
          <h2 className="text-2xl font-bold mb-3">Ready to Make New Friends?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join our community and start building meaningful connections today
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate("/profile")}
          >
            Complete Your Profile
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Connect;

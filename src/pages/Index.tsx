import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare, MapPin, Heart, Shield, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import CreateActivityDialog from "@/components/CreateActivityDialog";
import heroImage from "@/assets/hero-community.jpg";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleActivityCreated = () => {
    setIsCreateDialogOpen(false);
    navigate("/activities");
  };
  const features = [
    {
      icon: Users,
      title: "Find Your People",
      description: "Connect with others who share your interests and are also new to the area",
    },
    {
      icon: Calendar,
      title: "Discover Activities",
      description: "Join local events and activities tailored to your interests and comfort level",
    },
    {
      icon: MessageSquare,
      title: "Build Connections",
      description: "Start meaningful conversations in group settings or one-on-one",
    },
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "Join a trusted community with verified information and secure interactions",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Members" },
    { number: "500+", label: "Events Monthly" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Cities" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Welcome to Your New Community
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Connect Locally,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Belong Globally
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Moving to a new place? We help you build meaningful connections with people who share your interests, making every new beginning feel like home.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="gap-2"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <Plus className="w-5 h-5" />
                  Create Activity
                </Button>
                <Link to="/activities">
                  <Button variant="outline" size="xl" className="gap-2">
                    Browse Activities
                    <Calendar className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <img 
                src={heroImage} 
                alt="Community gathering" 
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Feel at Home
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make it easy for newcomers to find their community and build lasting connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Start connecting in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Share your interests, comfort levels, and what you're looking for in new connections
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold">Discover & Connect</h3>
              <p className="text-muted-foreground">
                Browse activities and people matched to your preferences and location
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">Build Community</h3>
              <p className="text-muted-foreground">
                Join activities, start conversations, and build lasting friendships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20 overflow-hidden">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to Find Your Community?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of people who have found meaningful connections through our platform
              </p>
              <Link to="/profile">
                <Button variant="hero" size="xl" className="gap-2">
                  Get Started Free
                  <Users className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">ConnectLocal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building communities, one connection at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/activities" className="hover:text-primary">Activities</Link></li>
                <li><Link to="/connect" className="hover:text-primary">Connect</Link></li>
                <li><Link to="/calendar" className="hover:text-primary">Calendar</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Safety</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ConnectLocal. Empowering communities through empathy, compassion, and respect.</p>
          </div>
        </div>
      </footer>

      <CreateActivityDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onActivityCreated={handleActivityCreated}
      />
    </div>
  );
};

export default Index;

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Calendar, Edit, Users as UsersIcon } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Profile = () => {
  const { userProfile, joinedActivities } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl">John Doe</CardTitle>
              <CardDescription className="text-lg">New to the area, excited to connect!</CardDescription>
              
              {/* Connection Count Badge */}
              <div className="flex justify-center mt-4">
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 inline-block">
                  <CardContent className="p-4 flex items-center gap-3">
                    <UsersIcon className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">
                        {userProfile.connectionCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Connections
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Phoenix, AZ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Joined 2 weeks ago</span>
                </div>
              </div>
              <div className="flex justify-center pt-2">
                <Button variant="outline" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <Textarea 
                    placeholder="Tell us about yourself..."
                    className="resize-none"
                    rows={4}
                    defaultValue="Recently relocated for a new job opportunity. Love outdoor activities, trying new restaurants, and meeting new people. Always up for coffee or a weekend hike!"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
                <CardDescription>What do you enjoy?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userProfile.interests.map((interest) => (
                    <Badge key={interest} className="bg-primary text-primary-foreground">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <Input placeholder="Add new interest..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Looking For</CardTitle>
                <CardDescription>What type of connections?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary" className="mr-2">New Friends</Badge>
                <Badge variant="secondary" className="mr-2">Activity Partners</Badge>
                <Badge variant="secondary" className="mr-2">Professional Network</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comfort Level</CardTitle>
                <CardDescription>Preferred group sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary" className="mr-2">One-on-One</Badge>
                <Badge variant="secondary" className="mr-2">Small Groups (3-5)</Badge>
                <Badge variant="secondary">Large Events</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your recent engagements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{joinedActivities.length}</div>
                  <div className="text-sm text-muted-foreground">Activities Joined</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">{userProfile.connectionCount}</div>
                  <div className="text-sm text-muted-foreground">Connections Made</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Events Created</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;

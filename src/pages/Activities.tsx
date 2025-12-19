import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Plus, Clock, Check, Trash2, CheckCircle2, XCircle, User } from "lucide-react";
import CreateActivityDialog from "@/components/CreateActivityDialog";
import { useApp } from "@/contexts/AppContext";
import { Progress } from "@/components/ui/progress";

const mockActivities = [
  {
    id: 1,
    title: "Coffee Meetup - Downtown",
    description: "Casual coffee meetup for newcomers to chat and connect",
    location: "Central Perk Cafe",
    date: "Tomorrow, 2:00 PM",
    attendees: 8,
    maxAttendees: 12,
    category: "Social",
  },
  {
    id: 2,
    title: "Weekend Hiking Trip",
    description: "Explore local trails with fellow outdoor enthusiasts",
    location: "Mountain Trail Park",
    date: "Saturday, 8:00 AM",
    attendees: 15,
    maxAttendees: 20,
    category: "Outdoors",
  },
  {
    id: 3,
    title: "Board Game Night",
    description: "Fun evening of board games and snacks at a local game cafe",
    location: "Game Haven",
    date: "Friday, 7:00 PM",
    attendees: 6,
    maxAttendees: 10,
    category: "Entertainment",
  },
  {
    id: 4,
    title: "Language Exchange Meetup",
    description: "Practice languages with native speakers in a friendly environment",
    location: "Public Library",
    date: "Thursday, 6:00 PM",
    attendees: 12,
    maxAttendees: 15,
    category: "Learning",
  },
];

const Activities = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { userProfile, joinActivity, isActivityJoined, pendingInvites, addPendingInvite, removePendingInvite } = useApp();

  const handleActivityCreated = (activity: any) => {
    addPendingInvite(activity);
  };

  // Sort activities by matching interests
  const sortedActivities = useMemo(() => {
    return [...mockActivities].sort((a, b) => {
      const aMatches = userProfile.interests.some(interest => 
        a.category.toLowerCase().includes(interest.toLowerCase()) ||
        a.title.toLowerCase().includes(interest.toLowerCase())
      );
      const bMatches = userProfile.interests.some(interest => 
        b.category.toLowerCase().includes(interest.toLowerCase()) ||
        b.title.toLowerCase().includes(interest.toLowerCase())
      );
      
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [userProfile.interests]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Activities</h1>
            <p className="text-muted-foreground">
              Discover and join local events to meet new people
            </p>
          </div>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Create Activity
          </Button>
        </div>

        {/* Pending Invites Section */}
        {pendingInvites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Activity Invites</h2>
            <div className="space-y-4">
              {pendingInvites.map((activity) => {
                const acceptedCount = activity.responses?.filter((r: any) => r.status === 'accepted').length || 0;
                const declinedCount = activity.responses?.filter((r: any) => r.status === 'declined').length || 0;
                const noResponseCount = activity.invitesSent - acceptedCount - declinedCount;
                const responseRate = Math.round((acceptedCount + declinedCount) / activity.invitesSent * 100);
                
                return (
                  <Card 
                    key={activity.id}
                    className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-accent/20 text-accent-foreground">
                              Your Activity
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Sent to {activity.invitesSent} people
                            </span>
                          </div>
                          <CardTitle className="text-xl">{activity.description}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePendingInvite(activity.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {activity.times.length} time option{activity.times.length > 1 ? 's' : ''} suggested
                        </span>
                      </div>
                      
                      {/* Response Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Response Rate</span>
                          <span className="text-muted-foreground">{responseRate}%</span>
                        </div>
                        <Progress value={responseRate} className="h-2" />
                        
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <div>
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">{acceptedCount}</div>
                              <div className="text-xs text-muted-foreground">Accepted</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <div>
                              <div className="text-lg font-bold text-red-600 dark:text-red-400">{declinedCount}</div>
                              <div className="text-xs text-muted-foreground">Declined</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="text-lg font-bold">{noResponseCount}</div>
                              <div className="text-xs text-muted-foreground">Pending</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Activities Section */}
        <h2 className="text-2xl font-bold mb-4">Available Activities</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Activities matching your interests appear first
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {sortedActivities.map((activity) => {
            const isJoined = isActivityJoined(activity.id);
            const matchesInterests = userProfile.interests.some(interest => 
              activity.category.toLowerCase().includes(interest.toLowerCase()) ||
              activity.title.toLowerCase().includes(interest.toLowerCase())
            );
            
            return (
              <Card 
                key={activity.id} 
                className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 ${
                  matchesInterests ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/50'
                } ${isJoined ? 'opacity-75' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge className="bg-secondary text-secondary-foreground">
                        {activity.category}
                      </Badge>
                      {matchesInterests && (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                <CardTitle className="text-2xl">{activity.title}</CardTitle>
                <CardDescription className="text-base">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{activity.location}</span>
                </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{activity.attendees} / {activity.maxAttendees} people going</span>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant={isJoined ? "secondary" : "default"}
                    onClick={() => !isJoined && joinActivity(activity)}
                    disabled={isJoined}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      "Join Activity"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <CreateActivityDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onActivityCreated={handleActivityCreated}
      />
    </div>
  );
};

export default Activities;

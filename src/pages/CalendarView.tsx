import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Trash2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const upcomingEvents = [
  {
    id: 1,
    date: "Today",
    time: "2:00 PM",
    title: "Coffee Meetup - Downtown",
    location: "Central Perk Cafe",
    attendees: 8,
    category: "Social",
  },
  {
    id: 2,
    date: "Tomorrow",
    time: "6:00 PM",
    title: "Language Exchange Meetup",
    location: "Public Library",
    attendees: 12,
    category: "Learning",
  },
  {
    id: 3,
    date: "Friday",
    time: "7:00 PM",
    title: "Board Game Night",
    location: "Game Haven",
    attendees: 6,
    category: "Entertainment",
  },
  {
    id: 4,
    date: "Saturday",
    time: "8:00 AM",
    title: "Weekend Hiking Trip",
    location: "Mountain Trail Park",
    attendees: 15,
    category: "Outdoors",
  },
  {
    id: 5,
    date: "Sunday",
    time: "11:00 AM",
    title: "Brunch & Books Club",
    location: "Riverside Cafe",
    attendees: 10,
    category: "Social",
  },
];

const CalendarView = () => {
  const { joinedActivities, removeActivity } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Calendar</h1>
          <p className="text-muted-foreground">
            Keep track of all your upcoming activities and meetups
          </p>
        </div>

        {joinedActivities.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No activities yet</h3>
              <p className="text-muted-foreground">
                Join some activities to see them appear in your calendar!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {joinedActivities.map((event) => (
                <Card 
                  key={event.id}
                  className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date} {event.time && `at ${event.time}`}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Badge className="bg-secondary text-secondary-foreground">
                          {event.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeActivity(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {joinedActivities.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {joinedActivities.length === 1 ? 'activity' : 'activities'} scheduled
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activities joined</span>
                    <span className="font-semibold">{joinedActivities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">People met</span>
                    <span className="font-semibold">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours socializing</span>
                    <span className="font-semibold">28</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarView;

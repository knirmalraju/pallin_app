import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityCreated: (activity: any) => void;
}

const CreateActivityDialog = ({ open, onOpenChange, onActivityCreated }: CreateActivityDialogProps) => {
  const [activityDescription, setActivityDescription] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Generate 3 suggested times (next 3 days at different times)
  const suggestedTimes = [
    { id: "1", label: "Tomorrow, 2:00 PM", value: "tomorrow-2pm" },
    { id: "2", label: "Day after tomorrow, 6:00 PM", value: "dayafter-6pm" },
    { id: "3", label: "This weekend, 10:00 AM", value: "weekend-10am" },
  ];

  const toggleTimeSelection = (timeValue: string) => {
    setSelectedTimes(prev => 
      prev.includes(timeValue) 
        ? prev.filter(t => t !== timeValue)
        : [...prev, timeValue]
    );
  };

  const handleSendInvite = () => {
    if (!activityDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe what activity you want to do",
        variant: "destructive",
      });
      return;
    }

    if (selectedTimes.length === 0) {
      toast({
        title: "Select Times",
        description: "Please select at least one time option",
        variant: "destructive",
      });
      return;
    }

    // Mock responses - some accepted, some declined, some no response
    const mockResponses = [
      { name: "John D.", status: "accepted" },
      { name: "Sarah K.", status: "accepted" },
      { name: "Mike R.", status: "declined" },
      { name: "Emma S.", status: null },
      { name: "Alex T.", status: "accepted" },
    ];

    // Create the activity invite
    const newActivity = {
      id: `activity-${Date.now()}`,
      description: activityDescription,
      times: selectedTimes,
      status: "pending",
      invitesSent: 5,
      responses: mockResponses,
      createdAt: new Date().toISOString(),
    };

    onActivityCreated(newActivity);
    
    toast({
      title: "Invite Sent!",
      description: `Your activity invite has been sent to 5 people`,
    });

    // Reset form
    setActivityDescription("");
    setSelectedTimes([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Activity Invite</DialogTitle>
          <DialogDescription>
            Describe your activity idea and suggest times. We'll send this to 5 people who might be interested!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="activity-description" className="text-base font-semibold">
              What do you want to do?
            </Label>
            <Textarea
              id="activity-description"
              placeholder="e.g., Grab coffee and chat downtown, Go for a hike at the local trail, Play board games at a cafe..."
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Suggest Time Options (select one or more)
            </Label>
            <div className="space-y-2">
              {suggestedTimes.map((time) => (
                <button
                  key={time.id}
                  onClick={() => toggleTimeSelection(time.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTimes.includes(time.value)
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">{time.label}</span>
                    {selectedTimes.includes(time.value) && (
                      <span className="ml-auto text-primary text-sm">✓ Selected</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSendInvite}
            className="w-full gap-2"
            size="lg"
          >
            <Send className="w-4 h-4" />
            Send Invite to 5 People
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateActivityDialog;

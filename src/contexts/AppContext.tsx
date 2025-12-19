import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: number | string;
  title: string;
  description?: string;
  location: string;
  date: string;
  time?: string;
  attendees: number;
  maxAttendees?: number;
  category: string;
}

interface UserProfile {
  interests: string[];
  connectionCount: number;
}

interface AppContextType {
  userProfile: UserProfile;
  joinedActivities: Activity[];
  pendingInvites: any[];
  joinActivity: (activity: Activity) => void;
  removeActivity: (activityId: number | string) => void;
  isActivityJoined: (activityId: number | string) => boolean;
  addConnection: () => void;
  addPendingInvite: (invite: any) => void;
  removePendingInvite: (inviteId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    interests: ["Hiking", "Coffee", "Photography", "Tech", "Food", "Travel"],
    connectionCount: 34,
  });

  const [joinedActivities, setJoinedActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem("joinedActivities");
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingInvites, setPendingInvites] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem("joinedActivities", JSON.stringify(joinedActivities));
  }, [joinedActivities]);

  const joinActivity = (activity: Activity) => {
    setJoinedActivities((prev) => {
      if (prev.some((a) => a.id === activity.id)) {
        return prev;
      }
      return [...prev, activity];
    });
    toast({
      title: "Activity Joined!",
      description: `You've successfully joined "${activity.title}"`,
    });
  };

  const removeActivity = (activityId: number | string) => {
    setJoinedActivities((prev) => prev.filter((a) => a.id !== activityId));
    toast({
      title: "Activity Removed",
      description: "The activity has been removed from your calendar",
    });
  };

  const isActivityJoined = (activityId: number | string) => {
    return joinedActivities.some((a) => a.id === activityId);
  };

  const addConnection = () => {
    setUserProfile((prev) => ({
      ...prev,
      connectionCount: prev.connectionCount + 1,
    }));
  };

  const addPendingInvite = (invite: any) => {
    setPendingInvites((prev) => [invite, ...prev]);
  };

  const removePendingInvite = (inviteId: string) => {
    setPendingInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
    toast({
      title: "Activity Deleted",
      description: "Your activity invite has been removed",
    });
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        joinedActivities,
        pendingInvites,
        joinActivity,
        removeActivity,
        isActivityJoined,
        addConnection,
        addPendingInvite,
        removePendingInvite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

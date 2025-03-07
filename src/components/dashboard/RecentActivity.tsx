
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, Clock, AlertCircle, Activity } from "lucide-react";

type ActivityStatus = "completed" | "failed" | "pending" | "warning";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: ActivityStatus;
  user: {
    name: string;
    initials: string;
  };
}

const statusIcons = {
  completed: <CheckCircle2 className="h-5 w-5 text-success" />,
  failed: <XCircle className="h-5 w-5 text-danger" />,
  pending: <Clock className="h-5 w-5 text-warning" />,
  warning: <AlertCircle className="h-5 w-5 text-warning" />
};

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        {activities.length > 0 ? (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center">
                      {statusIcons[activity.status]}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Activity className="h-10 w-10 mb-2" />
            <p>No hay actividad reciente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

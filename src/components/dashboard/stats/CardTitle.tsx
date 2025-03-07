
import { CardHeader, CardTitle as ShadcnCardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardTitleProps {
  title: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function CardTitle({ title, icon: Icon, iconClassName }: CardTitleProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <ShadcnCardTitle className="text-sm font-medium">{title}</ShadcnCardTitle>
      <div className={cn(
        "p-2 rounded-full",
        iconClassName || "bg-primary/10 text-primary"
      )}>
        <Icon className="h-4 w-4" />
      </div>
    </CardHeader>
  );
}

import * as Icon from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

export default function GetIcon({
  className,
  iconName,
}: {
  className?: string;
  iconName: string;
}): ReactElement | null {
  const IconComponent = Icon[iconName as keyof typeof Icon] as
    | LucideIcon
    | undefined;
  return IconComponent ? <IconComponent /> : null;
}

/**
 * -----------------------------------------------------------------------------
 * File: UserAvatar.tsx
 * Description:
 * Shared user avatar component.
 * -----------------------------------------------------------------------------
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image?: string;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={image} alt={name} />

      <AvatarFallback className="bg-blue-600 text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

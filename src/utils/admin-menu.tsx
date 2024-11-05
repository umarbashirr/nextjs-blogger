import { FileText, Home, MessageCircle, Settings, Tag } from "lucide-react";

export const adminMenuItems = [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: FileText,
    },
    {
      title: "Tags",
      url: "/admin/tags",
      icon: Tag,
    },
    {
      title: "Comments",
      url: "/admin/comments",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];
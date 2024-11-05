import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 className="w-8 h-8 animate-spin duration-500 repeat-infinite text-muted-foreground" />
    </div>
  );
};

export default Loading;

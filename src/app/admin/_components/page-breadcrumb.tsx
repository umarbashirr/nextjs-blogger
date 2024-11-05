"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { adminMenuItems } from "@/utils/admin-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const PageBreadCrumb = () => {
  const pathname = usePathname();
  const [matchedItemsForBreadcrumb, setMatchedItemsForBreadcrumb] = useState<
    any[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true to avoid SSR issues
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const paths = pathname.split("/").slice(1);
      const items = adminMenuItems;

      let matchedItemsForBreadcrumb: any[] = [];

      paths.forEach((path) => {
        const matchedItem = items.find((item) => item.url.includes(path));
        if (matchedItem) {
          matchedItemsForBreadcrumb.push(matchedItem); // Only push if matchedItem is not undefined
        }
      });

      setMatchedItemsForBreadcrumb(matchedItemsForBreadcrumb);
    }
  }, [pathname, isMounted]);

  // Avoid rendering until the component is fully mounted
  if (!isMounted) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchedItemsForBreadcrumb.map((item, index) => (
          <div key={item?.title} className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink href={item?.url}>{item?.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              className={
                index === matchedItemsForBreadcrumb.length - 1 ? "hidden" : ""
              }
            />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

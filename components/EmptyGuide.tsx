"use client";

import { ReactNode } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyGuideProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode; // optional extra actions (buttons, links)
}

const EmptyGuide = ({
  icon,
  title,
  description,
  children,
}: EmptyGuideProps) => {
  return (
    <Empty>
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>

        {description && (
          <EmptyDescription>{description}</EmptyDescription>
        )}
      </EmptyHeader>

      {children && children}
    </Empty>
  );
};

export default EmptyGuide;
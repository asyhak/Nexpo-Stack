"use client";

import React from "react";
import { Skeleton as BYSkeleton } from "boneyard-js/react";
import { SkeletonProps } from "./skeleton";

/**
 * Universal Skeleton wrapper for Web.
 * Uses boneyard-js/react for Next.js compatibility.
 */
export const Skeleton = ({
  name,
  loading,
  children,
  fixture,
}: SkeletonProps) => {
  return (
    <BYSkeleton name={name} loading={loading} fixture={fixture}>
      {children}
    </BYSkeleton>
  );
};

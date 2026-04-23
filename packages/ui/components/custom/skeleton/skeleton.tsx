import React from "react";
import { Skeleton as BYSkeleton } from "boneyard-js/native";

export interface SkeletonProps {
  name: string;
  loading: boolean;
  children: React.ReactNode;
  fixture?: React.ReactNode;
}

/**
 * Universal Skeleton wrapper for Native.
 * Note: boneyard-js/native does not support the 'fixture' prop directly
 * as capture happens on-device with real content.
 */
export const Skeleton = ({
  name,
  loading,
  children,
  fixture,
}: SkeletonProps) => {
  return (
    <BYSkeleton name={name} loading={loading}>
      {/* 
          On Native, we render the children directly. 
          The boneyard-js/native component handles the overlay logic.
      */}
      {children}
    </BYSkeleton>
  );
};

import React from 'react';
import { EmptyState } from '../ui/EmptyState';

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No Channel Listings"
      description="You must set up an online sales channel to have listings."
      primaryAction={{
        label: "Set up Online Channel",
        onClick: () => console.log("Set up channel clicked")
      }}
    />
  );
}
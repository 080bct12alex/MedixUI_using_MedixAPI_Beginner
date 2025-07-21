'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import react-pull-to-refresh (client-side only)
const PullToRefresh = dynamic(() => import('react-pull-to-refresh'), { ssr: false });

export default function PatientsWithRefresh({
  children,
  onRefresh,
}: {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      style={{ height: '100%', overflow: 'auto' }}
    >
      {children}
    </PullToRefresh>
  );
}

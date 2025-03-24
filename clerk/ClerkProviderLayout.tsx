"use client";

import { ClerkLoading, ClerkProvider, ClerkLoaded } from "@clerk/nextjs";

export default function ClerkProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ClerkLoading>
        <div className="flex items-center justify-center h-screen">
          Clerk is loading... Here add your loading spinner or animation
        </div>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}

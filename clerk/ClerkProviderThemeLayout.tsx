"use client";

import { ClerkLoading, ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

export default function ClerkProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism], // or dark, shadesOfPurple, add more themes according to your needs
      }}
    >
      <ClerkLoading>
        <div className="flex items-center justify-center h-screen">
          Clerk is loading... Here add your loading spinner or animation
        </div>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}

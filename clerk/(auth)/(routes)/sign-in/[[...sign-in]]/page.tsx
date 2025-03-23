"use client";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) return <SignIn />;

  return (
    <div>
      <div className="text-2xl bg-red-500 px-4 py-2 rounded flex justify-between items-center gap-4">
        Welcome! at Sign In page {user.firstName}
        <UserButton />
      </div>
      {/* <p>Your email is {user.primaryEmailAddress?.emailAddress}</p> */}
    </div>
  );
}

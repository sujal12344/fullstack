"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) return <SignUp />;

  return (
    <div>
      <div className="text-2xl bg-red-500 px-4 py-2 rounded">
        Welcome! at Sign Up page {user.fullName}
      </div>
      {/* <p>Your email is {user.primaryEmailAddress?.emailAddress}</p> */}
    </div>
  );
}

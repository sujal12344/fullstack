import { ClerkProvider } from "@clerk/nextjs";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-700 to-orange-300">
        {children}
      </div>
    </ClerkProvider>
  );
};

export default AuthLayout;

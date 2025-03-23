

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-700 to-orange-300">{children}</div>
  );
};

export default AuthLayout;

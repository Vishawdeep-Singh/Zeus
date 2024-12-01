const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      This Google's account email already exists . Instead Sign in With Email
      and Password
      <a href="/api/auth/signin" className="mt-4 text-blue-600">
        Go back to Sign In
      </a>
    </div>
  );
};

export default ErrorPage;

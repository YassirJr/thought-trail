function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="container mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

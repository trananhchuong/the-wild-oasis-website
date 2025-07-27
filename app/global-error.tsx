"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <main className="flex justify-center items-center flex-col gap-6 min-h-screen bg-gray-900 text-white">
          <h1 className="text-4xl font-bold text-red-400">Critical Error</h1>
          <p className="text-lg max-w-md text-center">{error.message}</p>
          <p className="text-sm text-gray-400">
            The application encountered a fatal error. Please try refreshing the page.
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded"
            onClick={reset}
          >
            Restart Application
          </button>
        </main>
      </body>
    </html>
  );
}
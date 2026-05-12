export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="size-2 rounded-full bg-accent animate-pulse" />
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Loading portfolio…
        </p>
      </div>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Error</p>
        <h1 className="mt-3 text-2xl tracking-tight font-medium">Couldn't load content</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-foreground/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

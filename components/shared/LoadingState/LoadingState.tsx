const LoadingState = () => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#f8f8f6] dark:bg-[#111]">
      <div className="flex items-center gap-1.5" aria-label="Loading">
        <span className="size-1.5 animate-bounce rounded-full bg-[#111] [animation-delay:-0.3s] dark:bg-[#f8f8f6]" />
        <span className="size-1.5 animate-bounce rounded-full bg-[#111] [animation-delay:-0.15s] dark:bg-[#f8f8f6]" />
        <span className="size-1.5 animate-bounce rounded-full bg-[#111] dark:bg-[#f8f8f6]" />
      </div>
    </div>
  );
};

export default LoadingState;

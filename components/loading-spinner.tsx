"use client"

interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  message = "Loading...", 
  size = "md",
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  }

  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center" 
    : "flex items-center justify-center py-20"

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div 
          className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
        {message && (
          <p className="text-muted-foreground animate-pulse">{message}</p>
        )}
      </div>
    </div>
  )
}

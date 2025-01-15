import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive'
}

export function Alert({ children, className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border p-4",
        {
          'bg-destructive/15 border-destructive text-destructive': variant === 'destructive',
          'bg-background border-border': variant === 'default',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("font-medium mb-1", className)} {...props}>{children}</h5>
}

export function AlertDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm opacity-90", className)} {...props}>{children}</p>
} 
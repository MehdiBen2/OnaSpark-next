'use client'

import * as React from 'react'
import * as RadixPrimitive from '@radix-ui/react-primitive'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

const Button = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  ButtonProps
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors'
  
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  }

  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8'
  }

  return (
    <RadixPrimitive.Root
      ref={ref}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'RadixButton'

export { Button }

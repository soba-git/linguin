import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "tracking-wide inline-flex items-center uppercase justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-sky-300/50 aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform-gpu",
  {
    variants: {
      variant: {
        
        default:
          "bg-white text-slate-600 border-slate-200 border-2 border-b-4 shadow-[0_6px_0_rgba(0,0,0,0.06)] hover:shadow-[0_10px_18px_rgba(0,0,0,0.08)] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 transition-all drop-shadow-[0_4px_2px_rgba(0,0,0,0.08)]",
        primary:
          "bg-sky-400 text-white border-sky-500 border-b-4 shadow-[0_6px_0_rgba(2,132,199,0.12)] hover:bg-sky-500 hover:shadow-[0_12px_20px_rgba(2,132,199,0.12)] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 transition-all",
        secondary:
          "bg-green-400 text-white border-green-500 border-b-4 shadow-[0_6px_0_rgba(16,185,129,0.12)] hover:bg-green-500 hover:shadow-[0_12px_20px_rgba(16,185,129,0.12)] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 transition-all",
        danger:
          "bg-red-500 text-white border-red-600 border-b-4 shadow-[0_6px_0_rgba(220,38,38,0.12)] hover:bg-red-600 hover:shadow-[0_12px_20px_rgba(220,38,38,0.12)] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 transition-all",
        pro:
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-b-4 border-indigo-700 shadow-[0_10px_18px_rgba(79,70,229,0.18)] hover:shadow-[0_18px_30px_rgba(79,70,229,0.22)] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2 transition-all",

        
        primaryOutline:
          "bg-transparent text-sky-600 transition-colors hover:text-sky-800 focus:outline-none",
        secondaryOutline:
          "bg-white text-green-600 transition-colors hover:text-green-800 focus:outline-none",
        dangerOutline:
          "bg-white text-rose-600 transition-colors hover:text-rose-700 focus:outline-none",
        proOutline:
          "bg-white text-indigo-700 transition-colors hover:text-indigo-900 focus:outline-none",

        
        ghost:
          "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 shadow-none hover:shadow-[0_8px_12px_rgba(15,23,42,0.04)] hover:translate-y-[-1px] transition-all data-[state=open]:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200 dark:data-[state=open]:bg-slate-800",
        sidebar:
          "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 shadow-none hover:shadow-[0_6px_0_rgba(15,23,42,0.03)] hover:translate-y-[-1px] data-[state=open]:bg-slate-100 dark:bg-transparent dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-700 dark:data-[state=open]:bg-slate-800 transition-none",
        sidebarOutline:
          "bg-sky-500/10 text-sky-600 border-sky-300 border-2 hover:bg-sky-500/20 hover:text-sky-700 hover:border-sky-400 shadow-none hover:shadow-[0_8px_12px_rgba(2,132,199,0.04)] hover:translate-y-[-1px] transition-none",
        flag:
          "bg-transparent text-slate-600 shadow-none hover:translate-y-[-1px] transition-all dark:bg-transparent dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
        },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-6 has-[>svg]:px-4",
        icon: "h-10 w-10",
        rounded: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "tracking-wide inline-flex items-center uppercase justify-center gap-2 whitespace-nowrap rounded-2xl text-[15px] font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-offset-0 aria-invalid:ring-red-500/30 transform-gpu",
  {
    variants: {
      variant: {
        // Solid variants - flat with subtle shadow
        default:
          "bg-white text-slate-700 border-2 border-b-[3px] border-slate-300 hover:brightness-95 active:border-b-2 active:translate-y-[1px] transition-all duration-100",
        primary:
          "bg-sky-400 text-white border-b-[3px] border-sky-500 shadow-sm hover:bg-sky-500 active:border-b-[1px] active:translate-y-[2px] transition-all duration-100",
        secondary:
          "bg-green-500 text-white border-b-[3px] border-green-600 shadow-sm hover:bg-green-600 active:border-b-[1px] active:translate-y-[2px] transition-all duration-100",
        danger:
          "bg-red-500 text-white border-b-[3px] border-red-600 shadow-sm hover:bg-red-600 active:border-b-[1px] active:translate-y-[2px] transition-all duration-100",
        pro:
          "bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-b-[3px] border-indigo-700 shadow-sm hover:from-indigo-600 hover:to-indigo-700 active:border-b-[1px] active:translate-y-[2px] transition-all duration-100",

        // Outline variants - flat text-only style
        primaryOutline:
          "bg-transparent text-sky-500 hover:text-sky-600 active:text-sky-700 transition-colors duration-100",
        secondaryOutline:
          "bg-transparent text-green-500 hover:text-green-600 active:text-green-700 transition-colors duration-100",
        dangerOutline:
          "bg-transparent text-red-500 hover:text-red-600 active:text-red-700 transition-colors duration-100",
        proOutline:
          "bg-transparent text-indigo-600 hover:text-indigo-700 active:text-indigo-800 transition-colors duration-100",

        // Ghost/Sidebar variants - subtle with light effect
        ghost:
          "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl active:translate-y-[1px] transition-all duration-100 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100",
        sidebar:
          "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl active:translate-y-[1px] transition-all duration-100 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
        sidebarOutline:
          "bg-sky-50 text-sky-700 border-2 border-sky-200 hover:bg-sky-100 hover:border-sky-300 rounded-xl active:translate-y-[1px] transition-all duration-100",
        flag:
          "bg-transparent text-slate-600 hover:bg-slate-50 rounded-xl active:translate-y-[1px] transition-all duration-100 dark:text-slate-400 dark:hover:bg-slate-800",
        locked:
          "bg-neutral-200 text-neutral-500 border-b-[3px] border-neutral-400 cursor-not-allowed opacity-60",
      },
      size: {
        default: "h-[52px] px-6 py-3 has-[>svg]:px-5",
        sm: "h-9 gap-1.5 px-4 py-2 text-xs has-[>svg]:px-3",
        lg: "h-14 px-8 py-4 text-base has-[>svg]:px-6",
        icon: "h-12 w-12",
        rounded: "h-12 w-12 rounded-full",
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

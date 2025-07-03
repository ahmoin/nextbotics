import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer focus-visible:border-zinc-400 focus-visible:ring-zinc-400/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
	{
		variants: {
			variant: {
				default: "bg-zinc-800 text-white shadow-xs hover:bg-zinc-900",
				positive:
					"bg-green-500 text-white shadow-xs hover:bg-green-500/90 focus-visible:ring-green-500/20 bg-green-500/60",
				destructive:
					"bg-red-500 text-white shadow-xs hover:bg-red-500/90 focus-visible:ring-red-500/20 bg-red-500/60",
				outline:
					"border bg-zinc-800 shadow-xs hover:bg-zinc-700 hover:text-white border-zinc-700 hover:bg-zinc-700/50",
				secondary:
					"bg-zinc-700 text-white border-none shadow-xs hover:bg-zinc-700/80",
				ghost: "hover:bg-zinc-700 hover:text-white",
				link: "text-white border-none underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export function Button({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
	return (
		<button
			type="button"
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

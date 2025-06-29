import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-white placeholder:text-zinc-400 selection:bg-green-500 selection:text-white dark:bg-zinc-800/30 border-zinc-700 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-zinc-400 focus-visible:ring-zinc-400/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };

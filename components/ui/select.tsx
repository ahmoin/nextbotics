/** biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: not using select and option tags because it is harder to style that way */
/** biome-ignore-all lint/a11y/useSemanticElements: using ul instead of select and using li instead of option */
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const useOnClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	handler: (event: MouseEvent | TouchEvent) => void,
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};

interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface SelectProps extends React.ComponentPropsWithoutRef<"div"> {
	options: SelectOption[];
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
}

const Select = ({
	options,
	value,
	onValueChange,
	placeholder = "Select an option...",
	className,
	disabled = false,
	name,
	...props
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const selectRef = useRef<HTMLDivElement>(null);
	const optionsRef = useRef<HTMLUListElement>(null);
	const selectOptionsId = useId();

	const selectedOption = options.find((option) => option.value === value);
	const displayValue = selectedOption ? selectedOption.label : placeholder;

	useOnClickOutside(selectRef, () => setIsOpen(false));

	const handleToggle = () => {
		if (disabled) return;
		setIsOpen((prev) => !prev);
		setFocusedIndex(-1);
	};

	const handleOptionClick = (optionValue: string) => {
		onValueChange(optionValue);
		setIsOpen(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: handleOptionClick can not be added as dependency as it changes on every re-render and should not be used as a hook dependency
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (disabled) return;

			const visibleOptions = options.filter((opt) => !opt.disabled);

			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault();
					if (isOpen) {
						if (focusedIndex >= 0 && focusedIndex < visibleOptions.length) {
							handleOptionClick(visibleOptions[focusedIndex].value);
						} else {
							setIsOpen(false);
						}
					} else {
						setIsOpen(true);

						const currentIndex = visibleOptions.findIndex(
							(opt) => opt.value === value,
						);
						setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
					}
					break;
				case "Escape":
					e.preventDefault();
					setIsOpen(false);
					break;
				case "ArrowDown":
					e.preventDefault();
					if (!isOpen) {
						setIsOpen(true);

						const currentIndex = visibleOptions.findIndex(
							(opt) => opt.value === value,
						);
						setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
					} else {
						setFocusedIndex((prevIndex) => {
							const nextIndex = Math.min(
								prevIndex + 1,
								visibleOptions.length - 1,
							);

							if (optionsRef.current?.children[nextIndex]) {
								(
									optionsRef.current.children[nextIndex] as HTMLElement
								).scrollIntoView({ block: "nearest" });
							}
							return nextIndex;
						});
					}
					break;
				case "ArrowUp":
					e.preventDefault();
					if (!isOpen) {
						setIsOpen(true);

						const currentIndex = visibleOptions.findIndex(
							(opt) => opt.value === value,
						);
						setFocusedIndex(
							currentIndex !== -1 ? currentIndex : visibleOptions.length - 1,
						);
					} else {
						setFocusedIndex((prevIndex) => {
							const nextIndex = Math.max(prevIndex - 1, 0);

							if (optionsRef.current?.children[nextIndex]) {
								(
									optionsRef.current.children[nextIndex] as HTMLElement
								).scrollIntoView({ block: "nearest" });
							}
							return nextIndex;
						});
					}
					break;
				case "Home":
					e.preventDefault();
					if (isOpen) {
						setFocusedIndex(0);
						if (optionsRef.current?.children[0]) {
							(optionsRef.current.children[0] as HTMLElement).scrollIntoView({
								block: "nearest",
							});
						}
					}
					break;
				case "End":
					e.preventDefault();
					if (isOpen) {
						setFocusedIndex(visibleOptions.length - 1);
						if (optionsRef.current?.children[visibleOptions.length - 1]) {
							(
								optionsRef.current.children[
									visibleOptions.length - 1
								] as HTMLElement
							).scrollIntoView({ block: "nearest" });
						}
					}
					break;
			}
		},
		[isOpen, options, value, disabled, focusedIndex],
	);

	useEffect(() => {
		if (isOpen && selectedOption) {
			const index = options.indexOf(selectedOption);
			if (index !== -1) {
				setFocusedIndex(index);
			}
		}
	}, [isOpen, selectedOption, options]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: needed for select
		<div
			ref={selectRef}
			className={cn("relative", className)}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{name && <input type="hidden" name={name} value={value} />}

			<button
				type="button"
				className={cn(
					"flex size-full items-center justify-between whitespace-nowrap border border-zinc-700 px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-zinc-400 focus-visible:outline-none",
					"focus-visible:border-zinc-400 focus-visible:ring-zinc-400/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
					disabled && "cursor-not-allowed opacity-50",
				)}
				onClick={handleToggle}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-controls="select-options"
				disabled={disabled}
			>
				<span
					className={cn("block truncate", !selectedOption && "text-zinc-400")}
				>
					{displayValue}
				</span>
				{isOpen ? (
					<ChevronUp className="h-4 w-4 opacity-50 transition-transform duration-200" />
				) : (
					<ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
				)}
			</button>

			{isOpen && (
				<ul
					id={selectOptionsId}
					role="listbox"
					className={cn(
						"absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-zinc-700 bg-zinc-800 text-white shadow-lg focus:outline-none",
					)}
					ref={optionsRef}
					tabIndex={-1}
				>
					{options.map((option, index) => (
						// biome-ignore lint/a11y/useFocusableInteractive: TODO: improve accessibility
						// biome-ignore lint/a11y/useKeyWithClickEvents: TODO: improve accessibility
						<li
							key={option.value}
							role="option"
							aria-selected={option.value === value}
							id={`option-${option.value}`}
							className={cn(
								"relative cursor-default select-none py-2 pl-8 pr-2 text-sm",
								option.value === value && "font-semibold",
								focusedIndex === index && "bg-zinc-700",
								"hover:bg-zinc-700",
								option.disabled && "pointer-events-none",
							)}
							onClick={() =>
								!option.disabled && handleOptionClick(option.value)
							}
							onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
						>
							{option.label}
							{option.value === value && (
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<Check />
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export { Select };

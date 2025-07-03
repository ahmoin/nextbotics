import type * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
	id: string | number;
	xValue: number;
	yValue: number;
	label?: string;
}

interface BubbleChartProps extends React.ComponentPropsWithoutRef<"div"> {
	data: ChartDataPoint[];
	width?: string;
	height?: string;
	bubbleSizePx?: number;
	xAxisLabel?: string;
	yAxisLabel?: string;
	className?: string;
	paddingPx?: number;
	axisLabelOffsetPx?: number;
	tickLabelCount?: number;
}

const BubbleChart = ({
	data,
	width = "100%",
	height = "400px",
	bubbleSizePx = 16,
	xAxisLabel = "X-Axis",
	yAxisLabel = "Y-Axis",
	className,
	paddingPx = 40,
	axisLabelOffsetPx = 15,
	tickLabelCount = 5,
	...props
}: BubbleChartProps) => {
	const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
	const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
		null,
	);

	if (!data || data.length === 0) {
		return (
			<div
				className={cn(
					"flex items-center justify-center border bg-background text-foreground/50 text-sm",
					className,
				)}
				style={{ width, height }}
			>
				No chart data available.
			</div>
		);
	}

	const allXValues = data.map((d) => d.xValue);
	const allYValues = data.map((d) => d.yValue);

	const xMin = Math.min(...allXValues);
	const xMax = Math.max(...allXValues);
	const yMin = Math.min(...allYValues);
	const yMax = Math.max(...allYValues);

	const effectiveXMin = xMin === xMax ? xMin - 0.5 * Math.abs(xMin || 1) : xMin;
	const effectiveXMax = xMin === xMax ? xMax + 0.5 * Math.abs(xMax || 1) : xMax;
	const effectiveYMin = yMin === yMax ? yMin - 0.5 * Math.abs(yMin || 1) : yMin;
	const effectiveYMax = yMin === yMax ? yMax + 0.5 * Math.abs(yMax || 1) : yMax;

	const xRange = effectiveXMax - effectiveXMin;
	const yRange = effectiveYMax - effectiveYMin;

	const getTickValues = (min: number, max: number, count: number) => {
		const step = (max - min) / (count - 1);
		return Array.from({ length: count }, (_, i) => min + i * step);
	};

	const xTicks = getTickValues(effectiveXMin, effectiveXMax, tickLabelCount);
	const yTicks = getTickValues(effectiveYMin, effectiveYMax, tickLabelCount);

	return (
		<div
			className={cn("relative border bg-background overflow-hidden", className)}
			style={{ width, height }}
			{...props}
		>
			<div
				className="absolute"
				style={{
					left: paddingPx,
					top: paddingPx,
					right: paddingPx,
					bottom: paddingPx,
					width: `calc(100% - ${2 * paddingPx}px)`,
					height: `calc(100% - ${2 * paddingPx}px)`,
				}}
			>
				<div
					className="absolute left-0 top-0 bottom-0 w-px bg-zinc-500"
					style={{ top: 0, bottom: 0 }}
				/>

				<div
					className="absolute bottom-0 left-0 right-0 h-px bg-zinc-500"
					style={{ left: 0, right: 0 }}
				/>

				{yTicks.map((tickValue, i) => {
					const yPos = 100 - ((tickValue - effectiveYMin) / yRange) * 100;
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: the order won't change here
							key={`y-tick-${i}`}
							className="absolute right-full text-zinc-400 text-xs px-1 whitespace-nowrap"
							style={{
								top: `${yPos}%`,
								transform: "translateY(50%)",
								marginRight: "5px",
							}}
						>
							{tickValue.toFixed(1)}
						</div>
					);
				})}

				{xTicks.map((tickValue, i) => {
					const xPos = ((tickValue - effectiveXMin) / xRange) * 100;
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: the order won't change here
							key={`x-tick-${i}`}
							className="absolute top-full text-zinc-400 text-xs py-1 whitespace-nowrap"
							style={{
								left: `${xPos}%`,
								transform: "translateX(-50%)",
								marginTop: "5px",
							}}
						>
							{tickValue.toFixed(1)}
						</div>
					);
				})}

				{data.map((point) => {
					const xPercent = ((point.xValue - effectiveXMin) / xRange) * 100;
					const yPercent =
						100 - ((point.yValue - effectiveYMin) / yRange) * 100;

					return (
						// biome-ignore lint/a11y/noStaticElementInteractions: needed for tooltips
						<div
							key={point.id}
							className="absolute rounded-full flex items-center justify-center border whitespace-nowrap cursor-pointer"
							style={{
								width: `${bubbleSizePx}px`,
								height: `${bubbleSizePx}px`,
								left: `calc(${xPercent}% - ${bubbleSizePx / 2}px)`,
								top: `calc(${yPercent}% - ${bubbleSizePx / 2}px)`,
								lineHeight: "1",
							}}
							onMouseEnter={(e) => {
								setHoveredPoint(point);

								setTooltipPos({
									x: e.clientX,
									y: e.clientY,
								});
							}}
							onMouseLeave={() => {
								setHoveredPoint(null);
								setTooltipPos(null);
							}}
						></div>
					);
				})}
			</div>

			<div
				className="absolute bottom-0 left-1/2 text-sm text-zinc-300"
				style={{
					transform: `translateX(-50%) translateY(${paddingPx - axisLabelOffsetPx}px)`,
				}}
			>
				{xAxisLabel}
			</div>

			<div
				className="absolute left-0 top-1/2 text-sm text-zinc-300"
				style={{
					transform: `translateX(-${paddingPx - axisLabelOffsetPx}px) translateY(-50%) rotate(-90deg)`,
					transformOrigin: "0 0",
				}}
			>
				{yAxisLabel}
			</div>

			{hoveredPoint && tooltipPos && (
				<div
					className="absolute z-50 bg-background text-xs px-2 py-1 rounded shadow-md pointer-events-none"
					style={{
						left: tooltipPos.x + 10,
						top: tooltipPos.y + 10,

						position: "fixed",
					}}
				>
					{hoveredPoint.label && (
						<p className="font-bold mb-1">{hoveredPoint.label}</p>
					)}
					<p>
						{xAxisLabel}: {hoveredPoint.xValue.toFixed(1)}
					</p>
					<p>
						{yAxisLabel}: {hoveredPoint.yValue.toFixed(1)}
					</p>
				</div>
			)}
		</div>
	);
};

export { BubbleChart };

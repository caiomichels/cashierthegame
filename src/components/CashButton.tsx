import { MouseEventHandler } from "react"

interface CashButtonProps {
	src: string | undefined
	alt: string | undefined
	value: number
	onClick?: MouseEventHandler
	displayValue?: boolean
	className?: string
}

function CashButton({ src, alt, value, onClick, displayValue = true, className }: CashButtonProps) {
	return (
		<button
			type="button"
			className={`flex flex-col items-center ${className}`}
			onClick={onClick}
		>
			<img
				className={`${value > 100 ? "min-w-[77px]" : "min-w-8"} h-8`}
				src={src}
				alt={alt}
			/>
			{displayValue && <span>${Number(value / 100).toFixed(2)}</span>}
		</button>
	)
}

export default CashButton

interface KeyboardTextProps {
	children: string
	className?: string
	deletable?: boolean
}

function KeyboardText({ children, className, deletable = true }: KeyboardTextProps) {
	return (
		<div className="flex justify-center flex-wrap gap-x-1">
			{children.split("").map((letter, index) => (
				<span
					key={index}
					className={`hover:scale-125 cursor-pointer select-none ${className}`}
					onClick={(e) => {
						if (deletable) {
							e.currentTarget.classList.add("text-transparent")
							e.currentTarget.classList.add("shadow-transparent")
							e.currentTarget.classList.add("cursor-default")
						}
					}}
				>
					{letter}
				</span>
			))}
		</div>
	)
}

export default KeyboardText

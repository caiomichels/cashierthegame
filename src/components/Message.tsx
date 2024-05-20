interface MessageProps {
	className?: string
	children: string
	signal: string
}

function Message({ className, children, signal }: MessageProps) {
	return (
		<div
			className={`w-fit h-fit absolute
            p-4 m-10
            rounded-md bg-slate-200 text-4xl font-bold text-transparent
            text-center text-stroke-2 ${
				signal === "+" ? "stroke-green-500" : "stroke-red-500"
			} ${className}`}
		>
			{children}
		</div>
	)
}

export default Message

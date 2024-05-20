interface MessageProps {
	className?: string
	children: string
	signal?: string
}

function Message({ className, children }: MessageProps) {
	return (
		<div
			className={`w-fit h-fit absolute
            p-4 m-10
            rounded-md bg-slate-200 text-4xl font-bold text-slate-800
            text-center text-stroke-2 stroke-slate-800 ${className}`}
		>
			{children}
		</div>
	)
}

export default Message

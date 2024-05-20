import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

interface ButtonProps {
	children: string
	type?: "submit" | "reset" | "button" | "link" | undefined
	className?: string
	to?: string
	handler?: MouseEventHandler
}

function Button({ children, type, className, to, handler }: ButtonProps) {
	const navigate = useNavigate()

	return (
		<button
			type={type === "link" ? "button" : type || undefined}
			className={`
			transition-all
			px-7 py-3 rounded-md
			bg-slate-800 text-sepia-200 font-bold
			hover:bg-sepia-500 hover:text-slate-800 hover:scale-110
			${className}`}
			onClick={
				handler ||
				(() => {
					if (type === "link" && to) {
						navigate(to)
					}
				})
			}
		>
			{children}
		</button>
	)
}

export default Button

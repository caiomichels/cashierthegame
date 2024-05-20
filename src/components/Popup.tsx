import { MouseEventHandler } from "react"
import Button from "./Button"
import KeyboardText from "./KeyboardText"

interface PopupProps {
	title: string
	description: string
	handler: MouseEventHandler
	className?: string
}

function Popup({ title, description, handler, className }: PopupProps) {
	return (
		<div
			className={`w-1/2 h-1/2 absolute
    flex flex-col justify-between items-center 
    p-4 m-10
    rounded-md bg-slate-800
    text-center ${className}`}
		>
			<KeyboardText
				deletable={false}
				className={`text-4xl text-slate-800 font-extrabold 
						text-stroke-2 shadow-sepia-500`}
			>
				{title}
			</KeyboardText>
			<p className="text-xl text-slate-50">{description}</p>
			<Button
				className={`w-fit bg-slate-300 text-slate-800
                hover:bg-sepia-500`}
				handler={handler}
			>
				Start
			</Button>
		</div>
	)
}

export default Popup

import oc100 from "../assets/cash/oc100.png"

import { FormEvent, useEffect, useState } from "react"
import Button from "../components/Button"
import KeyboardText from "../components/KeyboardText"
import { useNavigate } from "react-router-dom"

function Home() {
	const [nickname, setNickname] = useState("")

	let navigate = useNavigate()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (nickname != "") {
			localStorage.setItem("nickname", JSON.stringify(nickname))
			navigate("/game")
		}
	}

	useEffect(() => {
		const parsedNickname = JSON.parse(localStorage.getItem("nickname") || "{}")
		if (
			!(Object.keys(parsedNickname).length === 0 && parsedNickname.constructor === Object) &&
			parsedNickname != ""
		) {
			setNickname(parsedNickname)
		}
	}, [])

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-slate-700">
			<div
				className={`w-1/2 h-2/3
                flex flex-col items-center justify-between
                p-5 rounded-xl bg-slate-50
				animate-float`}
			>
				<div className="mt-4">
					<KeyboardText
						className={`text-5xl text-sepia-500 font-bold 
						text-stroke-2 shadow-slate-800`}
					>
						The &#160; Cashier &#160; Game
					</KeyboardText>
				</div>
				<div className="flip h-1/2">
					<img src={oc100} className="transition-all h-full" />
				</div>
				{localStorage.getItem("nickname") ? (
					<Button type="link" to="/game">
						Play
					</Button>
				) : (
					<form
						className="w-full flex flex-col items-center gap-y-4"
						onSubmit={handleSubmit}
					>
						<input
							name="nickname"
							type="text"
							value={nickname}
							className={`
						nickname w-1/2
						px-2 py-1 bg-slate-50 rounded
						border border-slate-600
						active:border-transparent focus:border-transparent
						outline outline-2 outline-transparent
						active:outline-sepia-500 focus:outline-sepia-500
						text-lg placeholder-slate-600 placeholder:font-thin
						`}
							maxLength={24}
							placeholder="Enter a nickname"
							onChange={(e) => setNickname(e.target.value)}
						/>
						<Button type="submit">Play</Button>
					</form>
				)}
			</div>
		</div>
	)
}

export default Home

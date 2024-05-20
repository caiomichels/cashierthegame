import c1 from '../assets/cash/c1.png'
import c5 from '../assets/cash/c5.png'
import c10 from '../assets/cash/c10.png'
import c25 from '../assets/cash/c25.png'
import c50 from '../assets/cash/c50.png'
import c100 from '../assets/cash/c100.png'
import c200 from '../assets/cash/c200.png'
import c500 from '../assets/cash/c500.png'
import c1000 from '../assets/cash/c1000.png'
import c2000 from '../assets/cash/c2000.png'
import c5000 from '../assets/cash/c5000.png'
import c10000 from '../assets/cash/c10000.png'

import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CashButton from '../components/CashButton'
import Button from '../components/Button'
import { generatePurchase, Item, Purchase } from '../utils/utils'

// import customerAngry from "../assets/characters/angry.png"
// import customerDefault from "../assets/characters/default.png"
// import customerHappy from "../assets/characters/happy.png"
// import customerSucker from "../assets/characters/sucker.png"
import Popup from '../components/Popup'
import Message from '../components/Message'

interface Unit {
  value: number
  name: string
  src: string
}

function Game() {
  const rounds = 12
  const [currentRound, setCurrentRound] = useState(1)

  const navigate = useNavigate()

  const [nickname, setNickname] = useState('')
  const [score, setScore] = useState(0)

  const [phrase, setPhrase] = useState('')
  const [items, setItems] = useState(Array<Item>)
  const [payment, setPayment] = useState(Array<number>)
  const [purchaseValue, setPurchaseValue] = useState(0)
  const [correctRefund, setCorrectRefund] = useState(0)

  const [gameState, setGameState] = useState('init') // init, start, running, pause, end

  const [signal, setSignal] = useState('+')
  const [message, setMessage] = useState('Wait')
  const [messageDisplay, setMessageDisplay] = useState('hidden')

  const [currentRefund, setCurrentRefund] = useState(Array<number>)

  const unitList: Unit[] = [
    { value: 1, name: 'One Cent Coin', src: c1 },
    { value: 5, name: 'Nickel Coin', src: c5 },
    { value: 10, name: 'Dime Coin', src: c10 },
    { value: 25, name: 'Quarter Dollar Coin', src: c25 },
    { value: 50, name: 'Half Dollar Coin', src: c50 },
    { value: 100, name: 'Dollar Coin', src: c100 },
    { value: 200, name: 'Two Dollars Bill', src: c200 },
    { value: 500, name: 'Five Dollars Bill', src: c500 },
    { value: 1000, name: 'Ten Dollars Bill', src: c1000 },
    { value: 2000, name: 'Twenty Dollars Bill', src: c2000 },
    { value: 5000, name: 'Fifty Dollars Bill', src: c5000 },
    { value: 10000, name: 'One Hundred Dollars Bill', src: c10000 },
  ]

  function handleRefundAdd(unit: Unit): void {
    console.log(currentRefund)
    if (gameState !== 'running') {
      return
    }
    setCurrentRefund([...currentRefund, unit.value])
  }

  function handleRefundRemove(index: number): void {
    setCurrentRefund(currentRefund.filter((_, i) => i != index))
  }

  function handlePayback(e: FormEvent): void {
    e.preventDefault()
    if (gameState !== 'running' || currentRefund.length === 0) {
      return
    }

    setGameState('pause')
  }

  useEffect(() => {
    if (localStorage.getItem('nickname')) {
      setNickname(JSON.parse(localStorage.getItem('nickname') || '{}') || '')
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    switch (gameState) {
      case 'start': {
        setCurrentRound(1)

        const newPurchase: Purchase = generatePurchase()

        setScore(0)
        setPhrase(newPurchase.phrase)
        setItems(newPurchase.items)
        setPayment(newPurchase.payment)
        setPurchaseValue(newPurchase.purchaseValue)
        setCorrectRefund(newPurchase.correctRefund)

        setGameState('running')
        const popup = document.querySelector('.start-popup')
        popup?.classList.toggle('hidden')
        break
      }
      case 'pause': {
        setPayment([])
        setCurrentRefund([])

        if (currentRefund.length === 0) {
          setMessage('Wrong...')
          setSignal('-')
        } else {
          const currentRefundValue = currentRefund.reduce(
            (total, value) => total + value
          )
          if (currentRefundValue === correctRefund) {
            setMessage(`CORRECT!!!`)
            setSignal('+')
            setScore(score + 10)
          } else {
            // let sign = Math.sign(currentRefundValue - correctRefund)
            // setMessage(
            // 	`Wrong... $${((currentRefundValue - correctRefund * sign) / 100).toFixed(
            // 		2
            // 	)} ${sign > 0 ? "more" : "less"}`
            // )
            setMessage('Wrong...')
            setSignal('-')
          }
        }
        setMessageDisplay('flex')

        setTimeout(() => {
          setGameState('play')
        }, 2000)
        break
      }
      case 'play': {
        setCurrentRound(currentRound + 1)
        const newPurchase: Purchase = generatePurchase()
        setMessageDisplay('hidden')

        setPhrase(newPurchase.phrase)
        setItems(newPurchase.items)
        setPayment(newPurchase.payment)
        setPurchaseValue(newPurchase.purchaseValue)
        setCorrectRefund(newPurchase.correctRefund)

        if (currentRound >= rounds) {
          setGameState('end')
          return
        } else {
          setGameState('running')
        }
        break
      }
      case 'end': {
        setMessageDisplay('hidden')
        setPhrase('')
        const popup = document.querySelector('.end-popup')
        popup?.classList.toggle('hidden')
        break
      }
      case 'restart': {
        setCurrentRound(1)

        const newPurchase: Purchase = generatePurchase()

        setScore(0)
        setPhrase(newPurchase.phrase)
        setItems(newPurchase.items)
        setPayment(newPurchase.payment)
        setPurchaseValue(newPurchase.purchaseValue)
        setCorrectRefund(newPurchase.correctRefund)

        setGameState('running')
        const popup = document.querySelector('.end-popup')
        popup?.classList.toggle('hidden')
        break
      }
    }
  }, [gameState, setGameState])

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-700">
      <Popup
        title={`Let's    Start!`}
        description={`When the game start, you will need to give the customer the refund. NO CENT CAN BE WRONG! You can see the purchase value in the monitor at left. If you clicked in the coin or bill incorrectly, you can click in this coin or bill that appeared in the refund box to delete it. The game have ${rounds} rounds, and you gain 10 points for each correct refund. Good luck!`}
        handler={() => setGameState('start')}
        className="start-popup"
      ></Popup>
      <Popup
        title={`Oh,   you   got   ${score}   points!`}
        description={`${
          score < 40
            ? 'Ok, I know you have another type of intelligence.'
            : score < 70
            ? 'Mid.'
            : score < 90
            ? 'Whoa, congragulations.'
            : 'Bro, you rocked!'
        }`}
        handler={() => setGameState('restart')}
        className="end-popup hidden"
      ></Popup>
      <Message signal={signal} className={messageDisplay}>
        {message}
      </Message>
      <div
        className={`w-2/3vw min-h-5/6vh
                flex flex-col items-center justify-between
                p-5 rounded-xl bg-slate-50`}
      >
        <h1 className="w-full flex justify-between text-5xl font-bold text-slate-800">
          {nickname} - {score}
          <span className="text-3xl">
            {currentRound > rounds ? rounds : currentRound}/{rounds}
          </span>
        </h1>
        <div className="w-full h-[300px] flex gap-x-4">
          <div className="w-[306px] h-[288px] p-4 rounded-md bg-slate-900 font-ibm">
            {gameState === 'running' && (
              <ul className="w-full h-full flex flex-col items-center text-slate-50">
                {items.map((item, index) => {
                  const spaceChars = Math.abs(
                    26 -
                      (item.amount.toString().length +
                        item.name.length +
                        Number(item.price / 100).toFixed(2).length +
                        2)
                  )
                  return (
                    <li key={index}>
                      {item.amount} {item.name}
                      {'.'.repeat(spaceChars)}$
                      {Number(item.price / 100).toFixed(2)}
                    </li>
                  )
                })}
                <li key={1000}>{'-'.repeat(26)}</li>
                <li key={1001}>
                  Total
                  {'.'.repeat(
                    26 - 6 - Number(purchaseValue / 100).toFixed(2).length
                  )}
                  ${Number(purchaseValue / 100).toFixed(2)}
                </li>
              </ul>
            )}
          </div>
          <div
            className={`w-[calc(100%-306px)] h-[340px] flex flex-col gap-y-4`}
          >
            <div
              className={`w-full min-h-20 h-fit flex justify-center items-center gap-x-2
							p-2 rounded-full border-2 border-slate-800 text-center`}
            >
              {phrase}
            </div>
            <div
              className={`overflow-scroll w-full min-h-20 flex self-end gap-x-2
							p-2 rounded-md border-2 border-slate-800`}
            >
              {payment.length > 0 &&
                payment.map((unit, index) => {
                  const valueMatch = unitList.find(
                    (unitSrc) => unitSrc.value === unit
                  )
                  return (
                    <CashButton
                      key={index}
                      src={valueMatch?.src}
                      alt={valueMatch?.name}
                      value={unit}
                      displayValue={false}
                      className="cursor-default"
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <form
            className="w-full flex items-center gap-x-4"
            onSubmit={handlePayback}
          >
            <div
              className={`overflow-scroll w-full min-h-20 flex gap-x-2
							p-2 rounded-md border-2 border-slate-800`}
            >
              {currentRefund.map((unit, index) => {
                const valueMatch = unitList.find(
                  (unitSrc) => unitSrc.value === unit
                )
                return (
                  <CashButton
                    key={index}
                    src={valueMatch?.src}
                    alt={valueMatch?.name}
                    value={unit}
                    onClick={() => handleRefundRemove(index)}
                    displayValue={false}
                  />
                )
              })}
            </div>
            <Button type="submit" className="w-fit h-fit px-3 py-2">
              Payback
            </Button>
          </form>
          <div className="overflow-scroll w-full h-fit min-h-[96px] max-h-[128px] flex justify-center flex-wrap gap-4">
            {unitList.map((unit, index) => (
              <CashButton
                key={index}
                src={unit.src}
                alt={unit.name}
                value={unit.value}
                onClick={() => handleRefundAdd(unit)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game

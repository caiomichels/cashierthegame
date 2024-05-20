import productsList from "../assets/data/products.json"
import phrasesList from "../assets/data/phrases.json"

export function floatify(num: number): number {
	return parseFloat(num.toFixed(10))
}

export interface Item {
	name: string
	price: number
	amount: number
}

export interface Purchase {
	phrase: string
	items: Item[]
	payment: number[]
	paymentValue: number
	purchaseValue: number
	correctRefund: number
}

export function generatePurchase(): Purchase {
	const itemsLength = 6

	let items: Item[] = []

	for (let i = 0; i < itemsLength; i++) {
		const randomIndex = Math.floor(Math.random() * productsList.products.length)
		const randomItem = productsList.products[randomIndex]

		if (items.find((item) => item.name === randomItem.name)) {
			i--
			continue
		}

		const amount = Math.floor(Math.random() * 5) + 1
		const item: Item = { ...randomItem, amount }
		items.push(item)
	}

	const phrase = phrasesList.phrases[Math.floor(Math.random() * phrasesList.phrases.length)]

	const purchaseValue = items
		.map((item) => item.price * item.amount)
		.reduce((total, value) => total + value)
	const payment = generatePayment(purchaseValue)
	const paymentValue = totalArr(payment)
	const correctRefund = paymentValue - purchaseValue

	const purchase: Purchase = {
		phrase,
		items,
		payment,
		paymentValue,
		purchaseValue,
		correctRefund,
	}

	return purchase
}

function generatePayment(purchaseValue: number): number[] {
	const unitList = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

	let paymentLength = Math.floor(Math.random() * 5) + 1

	let paymentLengthOK = false

	let payment: number[] = []

	while (!paymentLengthOK) {
		let check
		switch (paymentLength) {
			case 1:
				check = closestBigger(unitList, purchaseValue)
				if (check) {
					payment.push(check)
					paymentLengthOK = true
				} else {
					paymentLength = 2
				}
				continue
				break
			case 2:
				if (Math.floor(Math.random() * 2) == 0) {
					check = closestSmallest(unitList, purchaseValue)
					if (check) {
						payment.push(check)
						let paymentTotal = totalArr(payment)
						let check2 = closestBigger(unitList, purchaseValue - paymentTotal)
						if (check2) {
							payment.push(check2)
							paymentLengthOK = true
						} else {
							paymentLength = 3
						}
					} else {
						paymentLength = 3
					}
				} else {
					check = closestBigger(unitList, purchaseValue / 2)
					if (check) {
						payment.push(check)
						let paymentTotal = totalArr(payment)
						let check2 = closestBigger(unitList, purchaseValue - paymentTotal)
						if (check2) {
							payment.push(check2)
							paymentLengthOK = true
						} else {
							paymentLength = 3
						}
					} else {
						paymentLength = 3
					}
				}
				break
			case 3:
				check = closestSmallest(unitList, purchaseValue / 2)
				if (check) {
					payment.push(check)
					let paymentTotal = totalArr(payment)
					let check2 = closestSmallest(unitList, (purchaseValue - paymentTotal) / 2)
					if (check2) {
						payment.push(check2)
						paymentTotal = totalArr(payment)
						let check3 = closestBigger(unitList, purchaseValue - paymentTotal)
						if (check3) {
							payment.push(check3)
							paymentLengthOK = true
						} else {
							paymentLength = 4
						}
					} else {
						paymentLength = 4
					}
				} else {
					paymentLength = 4
				}
				break
			case 4:
				check = closestSmallest(unitList, purchaseValue / 3)
				if (check) {
					payment.push(check)
					let paymentTotal = totalArr(payment)
					let check2 = closestSmallest(unitList, (purchaseValue - paymentTotal) / 3)
					if (check2) {
						payment.push(check2)
						paymentTotal = totalArr(payment)
						let check3 = closestSmallest(unitList, (purchaseValue - paymentTotal) / 3)
						if (check3) {
							payment.push(check3)
							paymentTotal = totalArr(payment)
							let check4 = closestBigger(unitList, purchaseValue - paymentTotal)
							if (check4) {
								payment.push(check4)
								paymentLengthOK = true
							} else {
								paymentLength = 5
							}
						} else {
							paymentLength = 5
						}
					} else {
						paymentLength = 5
					}
				} else {
					paymentLength = 5
				}
				break
			case 5:
				check = closestSmallest(unitList, purchaseValue / 4)
				if (check) {
					payment.push(check)
					let paymentTotal = totalArr(payment)
					let check2 = closestSmallest(unitList, (purchaseValue - paymentTotal) / 4)
					if (check2) {
						payment.push(check2)
						paymentTotal = totalArr(payment)
						let check3 = closestSmallest(unitList, (purchaseValue - paymentTotal) / 4)
						if (check3) {
							payment.push(check3)
							paymentTotal = totalArr(payment)
							let check4 = closestBigger(unitList, (purchaseValue - paymentTotal) / 4)
							if (check4) {
								payment.push(check4)
								let check5 = closestBigger(unitList, purchaseValue - paymentTotal)
								if (check5) {
									payment.push(check5)
									paymentLengthOK = true
								}
							}
						}
					}
				}
		}
	}

	for (let i = 0; i < 10; i++) {
		payment.map((unit, i) => {
			if (totalArr(payment) - unit >= purchaseValue) {
				payment.splice(i, 1)
			}
		})
	}

	return payment
}

function closestBigger(arr: number[], x: number): number | undefined {
	return arr.sort((a, b) => a - b).find((a) => a >= x)
}

function closestSmallest(arr: number[], x: number): number | undefined {
	return arr.sort((a, b) => b - a).find((a) => a <= x)
}

function totalArr(arr: number[]): number {
	return arr.reduce((total, value) => total + value)
}

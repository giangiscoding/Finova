export interface PendingOrder {
  id: string
  amount: number
  date: string
  expectedPay: string
  items: number
}

export const pendingOrders: PendingOrder[] = [
  { id: "TT-8821043", amount: 2850000, date: "28/05", expectedPay: "02/06", items: 3 },
  { id: "TT-8819204", amount: 1920000, date: "27/05", expectedPay: "01/06", items: 2 },
  { id: "TT-8817651", amount: 3400000, date: "27/05", expectedPay: "01/06", items: 4 },
  { id: "TT-8815980", amount: 980000,  date: "26/05", expectedPay: "31/05", items: 1 },
  { id: "TT-8814372", amount: 2100000, date: "26/05", expectedPay: "31/05", items: 2 },
  { id: "TT-8812045", amount: 1650000, date: "25/05", expectedPay: "30/05", items: 2 },
  { id: "TT-8810931", amount: 1400000, date: "25/05", expectedPay: "30/05", items: 1 },
  { id: "TT-8808764", amount: 1400000, date: "24/05", expectedPay: "29/05", items: 1 },
  { id: "TT-8806512", amount: 760000,  date: "23/05", expectedPay: "28/05", items: 1 },
  { id: "TT-8804291", amount: 1240000, date: "23/05", expectedPay: "28/05", items: 2 },
]

export const MIN_ORDERS = 5
export const MIN_ADVANCE = 5000000
export const ADVANCE_RATE = 0.6

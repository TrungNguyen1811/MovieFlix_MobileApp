const getMoney = (amount) => {
  if (!amount || amount <= 0) return 'N/A'

  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Billion'
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + ' Million'
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(1).replace(/\.0$/, '') + ' K'
  } else {
    return amount.toString()
  }
}

export default getMoney

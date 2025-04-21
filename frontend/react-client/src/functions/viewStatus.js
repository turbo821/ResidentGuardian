
const viewStatus = (statusNumber) => {
  switch(statusNumber) {
    case 0:
      return "На рассмотрении"

    case 1: 
      return "В работе"

    case 2: 
      return "Решено"

    case 3: 
      return "Отклонено"

    default:
      return "Неопознанно"
  }
}

export default viewStatus;
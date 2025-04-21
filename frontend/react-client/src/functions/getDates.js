const getTimeRange = (range) => {
  const endDate = new Date();
  const startDate = new Date();
  
  endDate.setHours(23, 59, 59, 999);
  startDate.setHours(0, 0, 0, 0);

  switch(range) {
    case 'day':
      startDate.setDate(endDate.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    default:
      return null;
  }

  return [startDate.toISOString(), endDate.toISOString()];
};

export default getTimeRange;
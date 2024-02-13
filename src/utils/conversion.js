function getGitHubDateRangePrev(interval, startDate) {
  const currentDate = new Date();
  
  if (!startDate)
   startDate = new Date(currentDate);
  else
    startDate = new Date(startDate);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() - interval);
  
  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');
  const startDateString = `${startYear}-${startMonth}-${startDay}T00:00:00Z`;
  
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endDateString = `${endYear}-${endMonth}-${endDay}T00:00:00Z`;
  
  return { startDateString, endDateString };
}

function* generateGitDateRangePrev(startDate, endDate, interval = 7) {
  let {startDateString, endDateString} = getGitHubDateRangePrev(interval, startDate);
  while (new Date(endDateString).getTime() >= new Date(endDate).getTime()) {
    yield {startDateString, endDateString};
    ({startDateString, endDateString} = getGitHubDateRangePrev(interval, endDateString));
  }
}

function getGitHubDateRangeNext(interval, startDate) {
  const currentDate = new Date();
  
  if (!startDate)
   startDate = new Date(currentDate);
  else
    startDate = new Date(startDate);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + interval);
  
  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');
  const startDateString = `${startYear}-${startMonth}-${startDay}T00:00:00Z`;
  
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endDateString = `${endYear}-${endMonth}-${endDay}T00:00:00Z`;
  
  return { startDateString, endDateString };
}

function* generateGitDateRangeNext(startDate, endDate, interval = 7) {
  let {startDateString, endDateString} = getGitHubDateRangeNext(interval, startDate);
  while (new Date(endDateString).getTime() <= new Date(endDate).getTime()) {
    yield {startDateString, endDateString};
    ({startDateString, endDateString} = getGitHubDateRangeNext(interval, endDateString));
  }
}
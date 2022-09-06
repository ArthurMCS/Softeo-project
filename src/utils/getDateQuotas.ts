const getDateQuotas = (id:string, date: string, quotas: string, quotaValue: number) => {
  const dateArray = date.split('-');
  const [year, month, day] = dateArray.map(Number);
  const dateInit = new Date(year, month - 1, day);
  const dates = [];

  for (let i = 0; i < Number(quotas); i += 1) {
    if (i === 0) {
      dateInit.setMonth(dateInit.getMonth());
    } else {
      dateInit.setMonth(dateInit.getMonth() + 1);
    }
    const daySingle = dateInit.getDate();
    const monthSingle = dateInit.getMonth() + 1;
    const yearSingle = dateInit.getFullYear();

    dates.push({ id, date: `${yearSingle}-${monthSingle}-${daySingle}`, value: quotaValue });
  }

  return dates;
};

export default getDateQuotas;

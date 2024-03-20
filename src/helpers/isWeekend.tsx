
export const isWeekend = (day: string) =>  ['Sobota', 'Niedziela'].includes(day) ? { backgroundColor: 'yellow' } : { backgroundColor: 'white' };

export const getDayOfWeek = (year: number, month: number, day: number) => {
    const listDays = ["Niedziela", "Poniedzialek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const date = new Date(year, month - 1, day);
    return listDays[date.getDay()];
};

export const getDates = (startDate: Date, daysToAdd: number) => {
    const dates = [];
    for (let i = 0; i < daysToAdd; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(
        currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear()
      );
    }
    return dates;
  };
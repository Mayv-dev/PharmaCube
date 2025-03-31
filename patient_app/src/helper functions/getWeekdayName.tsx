export function getWeekdayName(dayNumber: number): string | null {
	const weekdays = ["Err","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	return dayNumber >= 0 && dayNumber <= 7 ? weekdays[dayNumber] : null;
}
export function getWeekdayName(dayNumber: number): string | null {
	const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	return dayNumber >= 0 && dayNumber <= 6 ? weekdays[dayNumber] : null;
}
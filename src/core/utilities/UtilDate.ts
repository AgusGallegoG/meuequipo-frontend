import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export function mapToLocaleDateString(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function mapToLocaleDateTimeString(date: Date): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
}

export function parseBackendDate(input: string): Date {
  // Si es solo una fecha (LocalDate), asumimos formato "YYYY-MM-DD"
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return dayjs(input, 'YYYY-MM-DD').toDate();
  }

  // Si incluye hora, es un LocalDateTime, parsea directo
  return new Date(input);
}

export function getWeekRangeFromOffset(offset: number = 0): { from: Date; to: Date } {
  const base = dayjs().add(offset, 'week');
  const from = base.startOf('isoWeek').toDate();
  const to = base.endOf('isoWeek').toDate();

  return { from, to };
}

export function getFormattedWeekFromOffset(offset: number = 0): string {
  const { from, to } = getWeekRangeFromOffset(offset);
  return `${dayjs(from).format('DD/MM/YYYY')} - ${dayjs(to).format('DD/MM/YYYY')}`;
}

export function formatShowMatchDateTime(date: Date): string {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

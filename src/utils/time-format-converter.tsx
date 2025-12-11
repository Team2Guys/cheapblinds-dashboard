export const formatDate = (dateISO: string) => {
  const date = new Date(dateISO);
  const parts = date
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    .split(' ');

  const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  return formattedDate;
};

export const formatTime = (time: string): string => {
  const [hourStr, minuteStr] = time.trim().split(':');
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || '00';

  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12; // converts 0 -> 12, 13 -> 1, etc.

  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
};

export const formatDateTime = (iso: string): string => {
  const dateObj = new Date(iso);

  // Date
  const parts = dateObj
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    .split(' ');
  const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;

  // Time
  const hour24 = dateObj.getHours();
  const minute = dateObj.getMinutes().toString().padStart(2, '0');

  const ampm = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = (hour24 % 12 || 12).toString().padStart(2, '0');

  return `${formattedDate}, ${hour12}:${minute} ${ampm}`;
};

export const thousandSeparator = price => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format date for display
export const formatDate = date => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time for display
export const formatTime = time => {
  return time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function formatTimeWithEnd(isoTime) {
  const startDate = new Date(isoTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour in milliseconds

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  return `${startTime} - ${endTime}`;
}

export function formatDateEnd(isoDate) {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
  const month = date.toLocaleString('default', {month: 'short'}); // Get short month name
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

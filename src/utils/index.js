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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getRandomImage = (seed: string): string => {
  const id = Math.abs(
    seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % 1000;
  return `https://picsum.photos/seed/${id}/400/300`;
};

export const formatHeight = (height: string): string => {
  if (height === 'unknown') return 'Unknown';
  return `${(parseInt(height) / 100).toFixed(2)} m`;
};

export const formatMass = (mass: string): string => {
  if (mass === 'unknown') return 'Unknown';
  return `${mass} kg`;
};

export const formatPopulation = (population: string): string => {
  if (population === 'unknown') return 'Unknown';
  return parseInt(population).toLocaleString();
};
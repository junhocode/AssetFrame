export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    const adjustedValue = Math.min(255, Math.max(50, value)); 
    color += ('00' + adjustedValue.toString(16)).substr(-2);
  }
  return color;
}
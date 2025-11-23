export const numberParser = (num: number, decimals: number = 2) => {
    if (num === 0) return "0";
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(decimals) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(decimals) + "K";
    }
    
    return num.toLocaleString('en-US', { 
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals 
    });
  };
export const stringToColor = (str: string): string => {
  let hash = 0;
  // 문자열을 해시값으로 전환
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const components = Array.from({ length: 3 }, (_, i) => {
    // 해시에서 8비트씩 잘라 R, G, B 값 추출
    const value = (hash >> (i * 8)) & 0xFF;
    // 숫자 범위 제한, 16진수 변환
    return Math.min(255, Math.max(50, value)).toString(16).padStart(2, '0');
  });

  return `#${components.join('')}`;
};
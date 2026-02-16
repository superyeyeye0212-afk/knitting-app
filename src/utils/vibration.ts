export const vibrate = (duration: number | number[]) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  }
};

export const vibrateShort = () => vibrate(50);
export const vibrateMedium = () => vibrate(100);
export const vibrateLong = () => vibrate(200);
export const vibratePattern = (pattern: number[]) => vibrate(pattern);

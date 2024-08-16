export const getRandomIP = () => {
  const randomOctet = () => Math.floor(Math.random() * 256);
  return `${randomOctet()}.${randomOctet()}.${randomOctet()}.${randomOctet()}`;
};

export const getUserAgent = () => {
  const agents = [
    "Supers/24.15.0 (AndroidPhone; 34)",
    "Supers/24.15.0 (iPhone; iOS 17.7.1)",
    "Supers/24.12.0 (AndroidPhone; 34)",
    "Supers/24.12.0 (AndroidPhone; 33)",
    "Supers/24.12.0 (AndroidPhone; 35)",
    "Supers/24.13.0 (iPhone; iOS 16.5.1)",
  ];
  return agents[Math.floor(Math.random() * agents.length)];
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateNumber = () => {
  return Math.floor(Math.random() * (10000 - 0) + 0);
};

const generateKey = () => {
  return `${generateNumber()}${generateNumber()}${generateNumber()}${generateNumber()}`;
};

console.log(generateKey());

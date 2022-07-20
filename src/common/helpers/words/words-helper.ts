import WORDS from './words';

const PASSPHRASE_LENGTH = 12;

const generatePassphrase = () => {
  const seedArray = [];
  for (let x = 0; x < PASSPHRASE_LENGTH; x += 1) {
    seedArray.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return seedArray.join(' ');
};

const generateRandomPassword = () => {
  const password = Math.random().toString(36);
  return password.substring(2, password.length - 3);
};

export default { generatePassphrase, generateRandomPassword };

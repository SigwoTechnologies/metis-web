import { detect } from 'detect-browser';

export default function hasStringJsonStructure(str: string | null) {
  if (!str) return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

const baseNQT = 100000000;

function formatNumberCurrency(numberCurrency: number, maximumFractionDigits = 2) {
  if (!numberCurrency) {
    throw new Error(`Number (${numberCurrency}) to format should not be null or undefined!`);
  }

  const number = typeof numberCurrency === 'string' ? parseFloat(numberCurrency) : numberCurrency;
  const options = { maximumFractionDigits };
  return Math.abs(number).toLocaleString('en-US', options);
}

export function formatNQTNumberCurrency(nqtAmount: number) {
  if (!nqtAmount) {
    throw new Error('Amount is required');
  }
  return formatNumberCurrency(nqtAmount / baseNQT, 8);
}

export function convertJupToNQT(jup: number) {
  if (!jup && jup !== 0) {
    throw new Error('NQT to convert is required');
  }
  return +jup * baseNQT;
}

export function convertNQTToJup(nqt: number) {
  if (!nqt && nqt !== 0) {
    throw new Error('Jup to convert is required');
  }

  return +nqt / baseNQT;
}

export function randomNumbers(qty: number) {
  return Math.floor(Math.random() * 90000) + 2000 * qty;
}

export function browserFeatures() {
  const browser = detect();
  return browser && `${browser.name} ${browser.version} on ${browser.os}`;
}

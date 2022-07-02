module.exports = {
  '*.{ts,tsx,scss}': () => [
    'yarn run format:fix',
    'yarn run lint',
    'yarn run type:check',
    'yarn run format:check',
  ],
};

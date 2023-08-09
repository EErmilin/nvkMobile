module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-native/no-inline-styles': 'off',
  },
};

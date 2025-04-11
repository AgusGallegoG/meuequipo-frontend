import pluginVue from 'eslint-plugin-vue';

export default [
  {
    parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
    plugins: ['@typescript-eslint'], // Activa los plugins de TypeScript
    extends: [
      'eslint:recommended', // Reglas recomendadas de ESLint
      'plugin:@typescript-eslint/recommended', // Reglas recomendadas de TypeScript
      ...pluginVue.configs['flat/recommended'],
    ],
    rules: {
      // Aquí van tus reglas específicas, incluyendo las que quieres modificar
      // 'no-unused-vars': 'warn', // Ejemplo: convertir 'error' a 'warn'
      // '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];

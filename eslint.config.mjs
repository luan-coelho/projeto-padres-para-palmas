import eslintPluginAstro from 'eslint-plugin-astro'

export default [
    // Adiciona as configurações recomendadas do plugin Astro
    ...eslintPluginAstro.configs.recommended,
    {
        // Configurações globais
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module'
        },
        rules: {
            // Regras personalizadas podem ser adicionadas aqui
            // Exemplo: 'no-console': 'warn'
        }
    },
    {
        // Ignora arquivos que não precisam de linting
        ignores: ['dist/**', 'node_modules/**', '.astro/**']
    }
]

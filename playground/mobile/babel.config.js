module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'app',
          // Obrigatório: processa os arquivos do ds-core para o Unistyles aplicar os estilos.
          // Sem essa linha, estilos do @aurea/ds-core não aplicam — sem erro, sem aviso.
          autoProcessImports: ['@aurea/ds-core'],
        },
      ],
      // react-native-reanimated/plugin DEVE ser o último plugin.
      'react-native-reanimated/plugin',
    ],
  };
};

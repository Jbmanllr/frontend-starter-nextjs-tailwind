module.exports = {
    plugins: [
      'postcss-import',
      'tailwindcss/nesting',
      'tailwindcss',
      'autoprefixer',
      //...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 2,
          features: {
            'custom-properties': false,
          },
        },
      ],
    ],
  }
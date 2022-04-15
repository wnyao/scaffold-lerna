const cwd = process.cwd();
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { APP_PATH, NODE_ENV, DEADCODE_MODE } = process.env;
const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  target: 'web',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'assets/[name].bundle.[contenthash:8].js',
    chunkFilename: 'assets/[name].chunk.[contenthash:8].js',
    path: path.resolve(cwd, `${APP_PATH}`),
    publicPath: `/${APP_PATH}/`
  },
  resolve: {
    alias: {
      '@': [path.resolve(cwd, 'src'), path.resolve(cwd, '../core')],
      lodash: 'lodash-es'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(cwd, 'src'), path.resolve(cwd, '../core')].filter(Boolean),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'babel-plugin-styled-components',
                  {
                    displayName: isDevelopment,
                    pure: true
                  }
                ],
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  }
                ],
                NODE_ENV !== 'production' && 'react-refresh/babel'
              ].filter(Boolean),
              presets: [
                [
                  '@babel/env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    modules: DEADCODE_MODE ? false : 'auto',
                    targets: {
                      browsers: ['defaults', 'not IE 11', 'not IE_Mob 11']
                    }
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp3|woff|ttf|otf|eot|woff2)$/,
        include: [path.resolve(cwd, 'src/assets/images/lottery/balls')],
        type: 'asset/resource',
        generator: {
          filename: 'assets/static/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|mp3|mp4|woff|ttf|otf|eot|woff2)$/,
        exclude: [path.resolve(cwd, 'src/assets/images/lottery/balls')],
        type: 'asset',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: isProduction && {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          priority: -20
        }
      }
    },
    chunkIds: 'deterministic',
    minimize: isProduction,
    minimizer: [
      isProduction &&
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              pure_funcs: ['console.log', 'console.debug', 'console.warn']
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true
        })
    ].filter(Boolean)
  }
};

import path from 'path';
import { Configuration } from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import 'webpack-dev-server';

const { NODE_ENV, WATCH_MODE } = process.env;

const isProduction = NODE_ENV === 'production' && WATCH_MODE !== 'true';
const isLiveReload = !isProduction;

export const CSS_MODULES_LOCALS_CONVENTION = 'camelCase';

export const SASS_OPTIONS = {
  includePaths: [path.resolve(`./src/shared/view/styles/`)],
};

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName:
        isProduction ? '[hash:base64]' : '[name]__[local]--[hash:base64:5]',
      exportLocalsConvention: CSS_MODULES_LOCALS_CONVENTION,
    },
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: { plugins: [autoprefixer()] },
  },
};

const scssLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: SASS_OPTIONS,
  },
};

const hashType = isProduction ? 'contenthash' : 'fullhash';

const webpackConfig: Configuration = {
  context: sourcePath,
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './index.tsx',
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: ({ runtime }) => {
      switch (runtime) {
        default:
          return `[name].[${hashType}].js`;
      }
    },
    chunkFilename: `chunks/[name].[${hashType}].js`,
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /.scss/,
        use: [
          'style-loader',
          cssLoader,
          postcssLoader,
          scssLoader,
        ],
      },
      {
        test: /\.(a?png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: { filename: 'images/[hash][ext][query]' },
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[hash][ext][query]' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    isLiveReload && new ReactRefreshWebpackPlugin(),
  ].filter((plugin): plugin is Exclude<typeof plugin, false> => Boolean(plugin)),
  devServer: {
    static: {
      directory: outPath,
    },
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    devMiddleware: {
      stats: 'minimal',
    },
    client: {
      logging: 'warn',
    },
  },
};

export default webpackConfig;

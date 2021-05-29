const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // Il file js dove vengono importati tutti gli altri file js
    entry: "./src/scripts/scripts.js",

    // Cartella publica
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
        filename: "bundle.js",
    },
    watch: true,

    module: {
        rules: [
            // JS babel
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },

            // Sass
            {
                // Test serve per capire che tipo di file deve convertire. Questa è una
                // regex. In questo caso prenderà tutti i file scss, sass, css
                test: /\.(sa|sc|c)ss$/,

                // Configurazioni standard
                use: [
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },

            // Questo ti minimizza il css e te lo sposta in un singolo file nella dist
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },

            // Css loader
            // Non le userai ma serve in caso tu debba mettere nel css
            // Qualcosa come background-image: url(). Mo te lo spiego in chiamata
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",

                        options: {
                            outputPath: "images",
                        },
                    },
                ],
            },
            // Stessa cosa per quello su ma per i font
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts",
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
        // Questo sotto ti genera l'html nella cartella dist prendendo di riferimento
        // Il singolo file in src
        new HtmlWebpackPlugin({
            hash: true,
            template: "src/template/index.html",
            filename: "index.html",
        }),
    ],

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript
    // minifying and other things, so let's set mode to development
    mode: "development",
};

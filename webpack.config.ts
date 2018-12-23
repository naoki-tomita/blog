import { Configuration } from "webpack";
import { join } from "path";

const config: Configuration = {
  mode: "production",
  entry: [ "./src/scripts/index.tsx" ],
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { loader: "ts-loader", test: /\.tsx?$/ }
    ]
  }
}

export default config;
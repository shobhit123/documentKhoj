import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FunctionComponent } from "react";
import { ThemeProvider } from "./providers/theme/themeContext";
import { LanguageProvider } from "./providers/language/languageContext";

declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};

// Dynamically import all files from the 'pages' directory
const pages = require.context("./pages", true, /\.tsx$/);

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {pages.keys().map((filePath: string) => {
                const Component = (
                  pages(filePath) as { default: FunctionComponent }
                ).default;

                // Convert file path to a valid route
                let routePath = filePath
                  .replace("./", "/") // Remove leading ./
                  .replace(/\/index\.tsx$/, "") // Remove "/index.tsx" to make folder the route
                  .replace(/\.tsx$/, "") // Remove ".tsx" from other files
                  .toLowerCase();

                // Make documentUpload.tsx load at "/"
                if (routePath === "/documentupload") {
                  routePath = "/";
                }

                return (
                  <Route
                    key={routePath}
                    path={routePath}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

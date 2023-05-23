// The reportWebVitals.tsx file is a utility file used for reporting web vitals in a React application.
// Web vitals are a set of performance metrics recommended by Google that measure the performance and user experience of a website.
// This file provides a function called reportWebVitals that receives the performance metrics and sends them to an analytics service or logs them to the console for analysis.
// By default, this file is created when you create a new React app using Create React App (CRA) and is used to collect and report performance metrics of the application.

const reportWebVitals = (onPerfEntry: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

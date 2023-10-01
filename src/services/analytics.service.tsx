// import { analytics } from "firebase-config";
// import { logEvent } from "firebase/analytics";

const Log = (message?: any, ...args: any[]) => {
  if (import.meta.env.VITE_ENVIRONMENT !== "production") {
    console.debug(message, ...args);
  }
};

const AnalyticsLog = (message?: any, ...args: any[]) => {
  if (import.meta.env.VITE_ENVIRONMENT !== "production") {
    Log(message, args);
    // logEvent(analytics, message, args);
  }
};

Log.Analytics = AnalyticsLog;
export { Log };

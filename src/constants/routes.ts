// import i18n from "i18n";

export const HOME = "/";
export const DASHBOARD = "/dashboard";

// export const AUTH = i18n.t("routes.auth.root");
// export const CALLBACK = `__${AUTH}${i18n.t("routes.auth.callback")}`;

// export const LOGIN = `${AUTH}${i18n.t("routes.auth.login")}`;
// export const REGISTER = `${AUTH}${i18n.t("routes.auth.register")}`;
// export const RESET_PASSWORD = `${AUTH}${i18n.t("routes.auth.reset_password")}`;
// export const CHANGE_PASSWORD = `${AUTH}${i18n.t(
//   "routes.auth.change_password"
// )}`;

// export const CERTIFICATION_ROUTES = {
//   root: `/${i18n.t("routes.certification.root")}`,
//   enterPlate: i18n.t("routes.certification.enterPlate"),
//   userInfo: i18n.t("routes.certification.userInfo"),
//   document: i18n.t("routes.certification.document"),
// };

// export const OWNERSHIP_ROUTES = {
//   root: `/${i18n.t("routes.ownership.root")}`,
//   tutorial: i18n.t("routes.ownership.tutorial"),
//   provinceAvailable: i18n.t("routes.ownership.provinceAvailable"),
// };

export const CERTIFICATION_ROUTES = {
  root: "certificazione",
  enterPlate: "inserisci-targa",
  userInfo: "informazioni-utente",
  document: "documento",
};

const ROUTES = {
  enterEmail: "/inserisci-email",
  emailSent: "/email-inviata",
  certification: CERTIFICATION_ROUTES,
  // ownership: OWNERSHIP_ROUTES,
  home: "/",
  dashboard: "/dashboard",
};

export default ROUTES;

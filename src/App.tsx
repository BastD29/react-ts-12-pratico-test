// import Test from "./components/Test/Test";

// import BaseLayout from "components/layouts/BaseLayout/BaseLayout";

import ROUTES from "./constants/routes";
import BaseLayout from "./components/layouts/BaseLayout/BaseLayout";
import { Route, Routes } from "react-router-dom";
import CertificationRoutes from "./router/CertificationRoutes";

// export default function App() {
//   return (
//     <>
//       <Test />
//     </>
//   );
// }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}></Route>
      <Route
        path={`${ROUTES.certification.root}/*`}
        element={<CertificationRoutes />}
      />
    </Routes>
  );
}

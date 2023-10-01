import Test from "../components/pages/Test/Test";
import ROUTES from "../constants/routes";
import { Route, Routes } from "react-router-dom";

const CertificationRoutes = () => {
  return (
    <Routes>
      {/* <Route
        index
        element={
          user ? (
            <Navigate to={ROUTES.certification.enterPlate} replace />
          ) : (
            <Navigate to={ROUTES.enterEmail} replace />
          )
        }
      /> */}

      <Route path={ROUTES.certification.userInfo} element={<Test />} />
    </Routes>
  );
};

export default CertificationRoutes;

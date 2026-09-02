import { Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import loadable from "@loadable/component";

// tippy styles
import "tippy.js/dist/tippy.css"; // optional

// sitemap
import { sitemap } from "pages/sitemap";

// providers
import { useAccount } from "providers/Account";

// partials
import { Notification, SplashScreen } from "partials";

// types
import { PageDto } from "pages/types";

// Generals
const NotFound = loadable(() => import("pages/NotFound/NotFound"));

const renderRoutes = (pages: PageDto[], userRole?: number, parentRoute?: string) =>
  pages
    .filter((page) => (page.role ? page.role.indexOf(Number(userRole)) >= 0 : true))
    .map((page) =>
      page.children ? (
        <Route key={page.key} element={page.component} path={`${parentRoute ?? ""}${page.path}`}>
          {renderRoutes(page.children, userRole, page.path)}
        </Route>
      ) : (
        <Route key={page.key} element={page.component} path={`${parentRoute ?? ""}${page.path}`} />
      ),
    );

export const App = () => {
  const [loaded, setLoaded] = useState(true);

  const { account, logUserFromLocal } = useAccount();
  const userRole = account?.horizonUser?.roleId;

  const location = useLocation();

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.scrollBehavior = "auto";
      window.scroll({ top: 0 });
      html.style.scrollBehavior = "";
    }
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    logUserFromLocal();
  }, [logUserFromLocal]);

  const routes = useMemo(() => {
    if (!userRole) setLoaded(true);
    const routes = renderRoutes(sitemap, userRole);
    if (!userRole)
      setTimeout(() => {
        setLoaded(false);
      }, 1000);
    return routes;
  }, [userRole]);

  return (
    <>
      <Notification />
      <SplashScreen visible={loaded} />
      <Suspense>
        <Routes>
          {routes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

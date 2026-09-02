// layouts
import Auth from "layouts/Auth";
import GameLayout from "layouts/Game/Game";

// pages
// auth
import SignOut from "./Auth/SignOut";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Recovery from "./Auth/Recovery";
import UpdatePassword from "./Auth/UpdatePassword";
import SignedUp from "./Auth/SignedUp";
import AccountConfirmed from "./Auth/AccountConfirmed";
// home
import Home from "./Home";
// game
import Game from "./Game/Game";

// types
import { PageDto } from "./types";

export const pageId = {
  auth: "auth",
  signOut: "signOut",
  signIn: "signIn",
  signUp: "signUp",
  signedUp: "signedUp",
  accountConfirmed: "accountConfirmed",
  recovery: "recover",
  updatePassword: "updatePassword",
  game: "game",
  dashboard: "dashboard",
  home: "home",
  settings: "settings",
} as const;

export type PageId = (typeof pageId)[keyof typeof pageId];

export const sitemap: PageDto[] = [
  {
    key: pageId.auth,
    component: <Auth />,
    path: "/auth",
    children: [
      {
        key: pageId.signIn,
        path: "/",
        component: <SignIn />,
      },
      {
        key: pageId.signUp,
        path: "/sign-up",
        component: <SignUp />,
      },
      {
        key: pageId.signedUp,
        path: "/signed-up",
        component: <SignedUp />,
      },
      {
        key: pageId.accountConfirmed,
        path: "/account-confirmed",
        component: <AccountConfirmed />,
      },
      {
        key: pageId.recovery,
        path: "/recover",
        component: <Recovery />,
      },
      {
        key: pageId.updatePassword,
        path: "/update-password",
        component: <UpdatePassword />,
      },
    ],
  },
  {
    key: pageId.game,
    component: <GameLayout />,
    path: "/game",
    children: [
      {
        key: pageId.dashboard,
        path: "/",
        component: <Game />,
      },
    ],
  },
  {
    key: pageId.home,
    component: <Home />,
    path: "/",
  },
  {
    key: pageId.signOut,
    component: <SignOut />,
    path: "/sign-out",
  },
];

/**
 * @param targetPageId - target page
 * @param basePage - parent page
 * @param currentPath - current path
 * @returns path
 */
export const findPathInChildren = (
  targetPageId: PageId,
  basePage: PageDto,
  currentPath = "",
): string => {
  let path = "";
  const children = basePage.children ?? [];
  for (let i = 0; i < children.length; ++i) {
    const page = children[i];
    if (page.key === targetPageId) return (path = `${currentPath}${page.path}`);

    if (page.children) {
      path = findPathInChildren(targetPageId, page, currentPath + page.path);
      if (path) return currentPath + page.path;
    }
  }
  return path;
};

/**
 * @param targetPageId - target page
 * @returns complete path
 */
export const findPath = (targetPageId: PageId): string => {
  let path = "";
  for (let i = 0; i < sitemap.length; i++) {
    const page = sitemap[i];
    if (page.key === targetPageId) return page.path;
    if (page.children) {
      path = findPathInChildren(targetPageId, page, page.path === "/" ? "" : page.path);
      if (path) break;
    }
  }
  return path;
};

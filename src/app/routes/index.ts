import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/projects/route.project";
import { blogCategoryRoutes } from "../modules/blog-category/blog.category.route";
import { blogRoutes } from "../modules/blog/blog.route";

export const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/projects",
    route: projectRoutes,
  },
  {
    path: "/blog-categories",
    route: blogCategoryRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

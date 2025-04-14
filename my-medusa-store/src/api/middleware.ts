import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostAdminCreateBrand } from "./admin/brands/validators"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
  ],
})

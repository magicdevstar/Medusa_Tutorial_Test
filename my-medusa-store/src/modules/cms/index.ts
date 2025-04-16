import { Module } from "@medusajs/framework/utils"
import CmsModuleService from "./service"

export const CMS_MODULE = "cms"

export default Module(CMS_MODULE, {
  service: CmsModuleService,
})
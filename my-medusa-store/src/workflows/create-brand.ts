import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BRAND_MODULE } from "../modules/brand"
import BrandModuleService from "../modules/brand/service"

export type CreateBrandStepInput = {
  name: string
}
type CreateBrandWorkflowInput = {
  name: string
}

export const createBrandStep = createStep(
  "create-brand-step",
  async(input: CreateBrandStepInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )
    const brand = await brandModuleService.createBrands(input)
    
    return new StepResponse(brand, brand.id)
  },
  async (id: string, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    await brandModuleService.deleteBrands(id)
  }
)

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandWorkflowInput) => {
    const brand = createBrandStep(input);

    return new WorkflowResponse(brand)
  }
)
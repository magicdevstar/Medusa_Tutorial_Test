import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { InferTypeOf } from "@medusajs/framework/types";
import { Brand } from "../modules/brand/models/brand";
import { CMS_MODULE } from "../modules/cms";
import CmsModuleService from "../modules/cms/service";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"

type SyncBrandToCmsStepInput = {
  brand: InferTypeOf<typeof Brand>;
};

type SyncBrandToCmsWorkflowInput = {
  id: string
}

const syncBrandToCmsStep = createStep(
  "sync-brand-to-cms",
  async ({ brand }: SyncBrandToCmsStepInput, { container }) => {
    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE);

    await cmsModuleService.createBrand(brand);

    return new StepResponse(null, brand.id);
  },
  async (id, { container }) => {
    if (!id) {
      return;
    }

    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE);

    await cmsModuleService.deleteBrand(id);
  }
);
export const syncBrandToCmsWorkflow = createWorkflow(
  "sync-brand-to-cms",
  (input: SyncBrandToCmsWorkflowInput) => {
    // @ts-ignore
    const { data: brands } = useQueryGraphStep({
      entity: "brand",
      fields: ["*"],
      filters: {
        id: input.id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    })

    syncBrandToCmsStep({
      brand: brands[0],
    } as SyncBrandToCmsStepInput)

    return new WorkflowResponse({})
  }
)
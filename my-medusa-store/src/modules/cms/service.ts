import { Logger, ConfigModule } from "@medusajs/framework/types"

export type ModuleOptions = {
  apiKey: string
}

type InjectedDependencies = {
  logger: Logger
  configModule: ConfigModule
}

class CmsModuleService {
  private options_: ModuleOptions
  private logger_: Logger
  constructor({ logger }: InjectedDependencies, options: ModuleOptions) {
    this.logger_ = logger
    this.options_ = options
  }
  // in a realistic scenario, you'd use an SDK, fetch, or axios clients
  private async sendRequest(url: string, method: string, data?: any) {
    this.logger_.info(`Sending a ${method} request to ${url}.`)
    this.logger_.info(`Request Data: ${JSON.stringify(data, null, 2)}`)
    this.logger_.info(`API Key: ${JSON.stringify(this.options_.apiKey, null, 2)}`)
  }

  async createBrand(brand: Record<string, unknown>) {
    await this.sendRequest("/brands", "POST", brand)
  }

  async deleteBrand(id: string) {
    await this.sendRequest(`/brands/${id}`, "DELETE")
  }

  async retrieveBrands(): Promise<Record<string, unknown>[]> {
    await this.sendRequest("/brands", "GET")

    return []
  }
  
}

export default CmsModuleService
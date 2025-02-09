import { OpenAI } from 'openai'
import { StatusBarServiceProvider } from '@app/apis/vscode'
import {
  ConfigurationConversationService,
  ConfigurationSettingService,
} from '@app/services'
import { errorHandler } from './errorHandler'

type EmbeddingOptions = {
  input: string | string[]
  itemCount: number
  batchLength: number
}

export async function createEmbedding({
  input,
  itemCount,
  batchLength,
}: EmbeddingOptions): Promise<number[][] | undefined> {
  try {
    const model = ConfigurationSettingService.instance.embeddingModel
    const azureApiVersion = await ConfigurationSettingService.instance
      .azureApiVersion
    const apiKey = await ConfigurationSettingService.instance.getApiKey()
    if (!apiKey) throw new Error('Invalid Api Key')

    const openai = new OpenAI({
      apiKey: apiKey,
      defaultQuery: { 'api-version': azureApiVersion },
      defaultHeaders: { 'api-key': apiKey },
      baseURL: ConfigurationSettingService.instance.embeddingUrl,
      maxRetries: ConfigurationConversationService.instance.numOfAttempts,
    })

    const requestConfig =
      await ConfigurationSettingService.instance.getRequestConfig()

    const results = await openai.embeddings.create(
      {
        model,
        input,
      },
      requestConfig
    )

    StatusBarServiceProvider.instance.showStatusBarInformation(
      'sync~spin',
      `- embedding chunk [${itemCount}/${batchLength}]`
    )

    if (!results.data[0].embedding) {
      throw new Error('No embedding returned from the completions endpoint')
    }
    return results.data.map((d) => d.embedding)
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

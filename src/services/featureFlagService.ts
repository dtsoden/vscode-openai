import { VSCODE_OPENAI_EMBEDDING } from '@app/constants'
import { ConfigurationService } from '@app/services'
import { setFeatureFlag } from '@app/utilities/vscode'

export default function featureFlagService() {
  if (ConfigurationService.instance.embeddingModel !== 'setup-required') {
    setFeatureFlag(VSCODE_OPENAI_EMBEDDING.ENABLED_COMMAND_ID, true)
  } else {
    setFeatureFlag(VSCODE_OPENAI_EMBEDDING.ENABLED_COMMAND_ID, false)
  }
}

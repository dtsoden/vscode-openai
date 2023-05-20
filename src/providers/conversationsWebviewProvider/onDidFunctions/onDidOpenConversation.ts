import { IConversation } from '@app/interfaces'
import { ConversationService } from '@app/services'

export const onDidOpenConversationWebview = (
  conversation: IConversation
): void => {
  ConversationService.instance.show(conversation.conversationId)
}

import { WebviewView } from 'vscode'
import { ConversationStorageService } from '@app/services'

export const onDidInitialize = (webView: WebviewView): void => {
  const conversations = ConversationStorageService.instance.getAll()
  webView?.webview.postMessage({
    command: 'onWillConversationsLoad',
    text: JSON.stringify(conversations),
  })
}

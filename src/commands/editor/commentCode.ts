import { Command } from '../commandManager'
import { getSystemPersonas } from '@app/models'
import { compareResultsToClipboard, getEditorPrompt } from '@app/util/editor'

export default class CommentCodeCommand implements Command {
  public readonly id = 'vscode-openai.editor.code.comments'

  public async execute() {
    const prompt = await getEditorPrompt('editor.code.comments')
    const persona = getSystemPersonas().find(
      (a) => a.roleName === 'Developer/Programmer'
    )
    compareResultsToClipboard(persona, prompt)
  }
}

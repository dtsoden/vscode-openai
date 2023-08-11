import { commands } from 'vscode'
import { Command } from '../commandManager'

export default class SettingsCommand implements Command {
  public readonly id = 'vscode-openai.editor.settings'

  public async execute() {
    commands.executeCommand(
      'workbench.action.openSettings',
      'vscode-openai.prompt-editor'
    )
  }
}

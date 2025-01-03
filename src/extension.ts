import * as vscode from 'vscode'; // Import the VSCode API module to interact with the editor

// This function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Retrieve the current configuration settings
  const config = vscode.workspace.getConfiguration();
  // Get the value of the 'clox.relativeLineNumbers' setting
  const isEnabled = config.get<boolean>('clox.relativeLineNumbers');

  // If the setting is enabled, set the editor's line numbers to 'relative'
  if (isEnabled) {
    vscode.workspace.getConfiguration('editor').update('lineNumbers', 'relative', true);
  }

  // Register a command to toggle relative line numbers
  context.subscriptions.push(
    vscode.commands.registerCommand('clox.toggleRelativeLineNumbers', () => {
      // Get the current state of the setting
      const current = config.get<boolean>('clox.relativeLineNumbers');
      // Toggle the setting value
      config.update('clox.relativeLineNumbers', !current, vscode.ConfigurationTarget.Global);
      // Update the editor's line number mode based on the new setting
      vscode.workspace.getConfiguration('editor').update('lineNumbers', !current ? 'relative' : 'on', true);
    })
  );
}

// This function is called when the extension is deactivated
export function deactivate() {}

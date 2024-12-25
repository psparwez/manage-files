import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

  let createFileOrFolderCommand = vscode.commands.registerCommand('extension.createFileOrFolder', async () => {
    const type = await vscode.window.showQuickPick(['File', 'Folder'], { placeHolder: 'Choose file or folder to create' });
    const name = await vscode.window.showInputBox({ placeHolder: `Enter ${type} name` });
    
    if (!name) return;

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage('No workspace opened');
      return;
    }

    const newPath = path.join(workspaceFolder, name);
    
    try {
      if (type === 'File') {
        const newUri = vscode.Uri.file(newPath); 
        await vscode.workspace.fs.writeFile(newUri, Buffer.from(''));

        // - Check file extension and add boilerplate code if it's .jsx or .tsx
        const fileExtension = path.extname(name);
        const fileNameWithoutExtension = path.basename(name, fileExtension);

        let boilerplateCode = '';
        if (fileExtension === '.jsx') {
          boilerplateCode = `const ${fileNameWithoutExtension} = () => {\n  return (\n    <div>${fileNameWithoutExtension}</div>\n  )\n}\n\nexport default ${fileNameWithoutExtension};`;
        } else if (fileExtension === '.tsx') {
          boilerplateCode = `const ${fileNameWithoutExtension}: React.FC = () => {\n  return (\n    <div>${fileNameWithoutExtension}</div>\n  )\n}\n\nexport default ${fileNameWithoutExtension};`;
        }

        await vscode.workspace.fs.writeFile(newUri, Buffer.from(boilerplateCode));

      } else if (type === 'Folder') {
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(newPath));
      }

      vscode.window.showInformationMessage(`${type} created successfully at ${newPath}`);

      // - Open the newly created file in the current tab if it's a file
      if (type === 'File') {
        const document = await vscode.workspace.openTextDocument(vscode.Uri.file(newPath));
        await vscode.window.showTextDocument(document, { preview: false });
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(`Failed to create ${type}: ${error.message}`);
      } else {
        vscode.window.showErrorMessage(`An unknown error occurred while creating ${type}`);
      }
    }
  });

  context.subscriptions.push(createFileOrFolderCommand);

  // - rename File or Folder
  let renameFileOrFolderCommand = vscode.commands.registerCommand('extension.renameFileOrFolder', async () => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage('No workspace opened');
      return;
    }

    const files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(workspaceFolder));
    const fileNames = files.map(([name, type]) => ({ label: name, type }));

    const selectedItem = await vscode.window.showQuickPick(fileNames, { placeHolder: 'Select file/folder to rename' });

    if (!selectedItem) return;

    const selectedItemPath = path.join(workspaceFolder, selectedItem.label);
    const newName = await vscode.window.showInputBox({ placeHolder: `Enter new name for ${selectedItem.label}` });

    if (!newName) return;

    const newPath = path.join(workspaceFolder, newName);

    try {
      const itemUri = vscode.Uri.file(selectedItemPath);
      const newUri = vscode.Uri.file(newPath);

      // Rename the item
      await vscode.workspace.fs.rename(itemUri, newUri);

      vscode.window.showInformationMessage(`${selectedItem.label} renamed to ${newName} successfully`);

      // - Check if the file extension changed from .tsx to .jsx or vice versa
      const oldExtension = path.extname(selectedItem.label);
      const newExtension = path.extname(newName);

      if (oldExtension !== newExtension && (newExtension === '.jsx' || newExtension === '.tsx')) {
        const document = await vscode.workspace.openTextDocument(newUri);
        const content = document.getText();

        const fileNameWithoutExtension = path.basename(newName, newExtension);
        let newBoilerplateCode = '';

        if (newExtension === '.jsx') {
          newBoilerplateCode = `const ${fileNameWithoutExtension} = () => {\n  return (\n    <div>${fileNameWithoutExtension}</div>\n  )\n}\n\nexport default ${fileNameWithoutExtension};`;
        } else if (newExtension === '.tsx') {
          newBoilerplateCode = `const ${fileNameWithoutExtension}: React.FC = () => {\n  return (\n    <div>${fileNameWithoutExtension}</div>\n  )\n}\n\nexport default ${fileNameWithoutExtension};`;
        }

        await vscode.workspace.fs.writeFile(newUri, Buffer.from(newBoilerplateCode));
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(`Failed to rename: ${error.message}`);
      } else {
        vscode.window.showErrorMessage(`An unknown error occurred while renaming the file/folder`);
      }
    }
  });

  context.subscriptions.push(renameFileOrFolderCommand);

  // - Command to delete File or Folder
  let deleteFileOrFolderCommand = vscode.commands.registerCommand('extension.deleteFileOrFolder', async () => {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage('No workspace opened');
      return;
    }

    const files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(workspaceFolder));
    const fileNames = files.map(([name, type]) => ({ label: name, type }));
    
    const selectedItem = await vscode.window.showQuickPick(fileNames, { placeHolder: 'Select file/folder to delete' });
    
    if (!selectedItem) return;

    const selectedItemPath = path.join(workspaceFolder, selectedItem.label);
    
    const deleteConfirmation = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: `Are you sure you want to delete ${selectedItem.label}?` });
    if (deleteConfirmation === 'Yes') {
      try {
        const itemUri = vscode.Uri.file(selectedItemPath);
        if (selectedItem.type === vscode.FileType.Directory) {
          await vscode.workspace.fs.delete(itemUri, { recursive: true });
        } else {
          await vscode.workspace.fs.delete(itemUri);
        }
        vscode.window.showInformationMessage(`${selectedItem.label} deleted successfully`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(`Failed to delete: ${error.message}`);
        } else {
          vscode.window.showErrorMessage(`An unknown error occurred while deleting the file/folder`);
        }
      }
    }
  });

  context.subscriptions.push(deleteFileOrFolderCommand);
}

export function deactivate() {}

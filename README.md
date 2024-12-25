<a id="top"></a>


# <img width="25" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="VS code icons" /> Manage Files Extension for VS Code 

![Manage Files Extension](https://img.shields.io/badge/Manage%20Files%20Extension-%20-blue)

This extension provides useful commands for managing files and folders in your workspace. You can create, rename, and delete files and folders easily. Additionally, it offers specific boilerplate code insertion for `.jsx` and `.tsx` files.

## 🚀 Features

### 📂 Create File or Folder

Easily create new files or folders within your workspace with the following capabilities:
- Choose between creating a **File** or **Folder**.
- After creating a file, the extension will open it in the editor.
- If the file extension is `.jsx` or `.tsx`, a boilerplate code will be added automatically.

#### Commands:
- **File**: Creates an empty file at your specified location.
- **Folder**: Creates a new folder at your specified location.

### ✏️ Rename File or Folder

Rename any file or folder in your workspace. The extension helps you quickly rename your items and updates their paths accordingly.

#### Features:
- Allows you to choose any file or folder from the workspace.
- You can provide a new name for the selected item.

#### Special Handling:
- If a `.tsx` file is renamed to `.jsx`, or vice versa, the extension will remove the old boilerplate code and add the appropriate boilerplate code for the new file extension.

### 🗑️ Delete File or Folder

Delete any file or folder from your workspace with a simple command. You will be asked for a confirmation before deletion to prevent accidental loss.

#### Features:
- Choose whether to delete a **File** or **Folder**.
- Deletes the item after confirmation.

### 📄 Automatic Boilerplate Code for `.jsx` and `.tsx`

When you create a `.jsx` or `.tsx` file, the extension automatically adds a boilerplate code template based on the file type.

#### `.jsx` Boilerplate:
```jsx
const <fileName> = () => {
  return (
    <div><fileName></div>
  );
}
export default <fileName>;
```

#### `.tsx` Boilerplate:
```tsx
const <fileName>: React.FC = () => {
  return (
    <div><fileName></div>
  );
}

export default <fileName>;
```
The **`<fileName>`** will be replaced with the actual file name, making it easy to start building components quickly.

## 🏗️ Development
- Clone this repository.
- Open the project folder in VS Code.
- Press F5 to build and run the extension in a new VS Code window.
- Test and make modifications as needed.


##  Usage

### 🌀 Keybindings:

| Action                    | Windows/Linux Keybinding | Mac Keybinding  |
|---------------------------|---------------------------|-----------------|
| 📝 **Create File or Folder**  | `Ctrl+Shift+N`            | `Cmd+Shift+N`   |
| 🔄 **Rename File or Folder**  | `Ctrl+Shift+R`            | `Cmd+Shift+R`   |
| ❌ **Delete File or Folder**  | `Ctrl+Shift+D`            | `Cmd+Shift+D`   |

### ⚙️ How to Use:

| Action                                           | Keybinding (Windows/Linux) | Keybinding (Mac) |
|--------------------------------------------------|----------------------------|------------------|
| 📝 **Create a file or folder**                   | `Ctrl+Shift+N`             | `Cmd+Shift+N`    |
| 🔄 **Rename an existing file or folder**         | `Ctrl+Shift+R`             | `Cmd+Shift+R`    |
| ❌ **Delete a file or folder**                   | `Ctrl+Shift+D`             | `Cmd+Shift+D`    |


## 🐛 Issues / Bugs

If you encounter any bugs or issues while using the extension, please feel free to open an issue on the [GitHub repository](https://github.com/psparwez/manage-files/issues).

## 🤝 Contributors

We welcome contributions to improve this extension! Whether you want to report a bug, suggest a feature, or submit a pull request, we appreciate your help.

--- 
<div align="right">
<a href="#top" >🔝 Go to Top</a>
</div>
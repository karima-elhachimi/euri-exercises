## Setup Windows 10 for Modern/Hipster Development

A fresh Windows isn't entirely ready for modern development, but all the tools you need are available. A good terminal, popular bash tools, Git, a decent package manager - when properly setup, modern development on Windows can be a lot of fun. In particular, this document outlines how to configure your Windows in such a way that it can easily handle most development tasks usually run on a Mac OS X or a Linux distro.

#### Package Management: Chocolatey

Chocolatey is a powerful package manager for Windows, working sort of like apt-get or homebrew. Let's get that first. Fire up CMD.exe as Administrator and run:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

Once done, you can install packages by running `cinst` (short for `choco install`). Most packages below will be installed with Chocolatey.

See [https://chocolatey.org/packages?q=repository](https://chocolatey.org/packages?q=repository) for the chocolatey repository

> Many functions/packages require admin rights. When you open the command shell, you should ensure that you do so with "Run as Administrator" selected. If you are attempting to use Chocolatey in a non-administrator setting, you
> must select a different location other than the default install
> location. See [https://chocolatey.org/install#non-administrative-install](https://chocolatey.org/install#non-administrative-install) for details.

#### Better console window

The PowerShell in Windows 10 got a bunch of upgrades, but it's even better if used with [CMDer](https://github.com/bliker/cmder/), a powerful Console Emulator. Install with:

- [Download Full](https://github.com/cmderdev/cmder/releases/download/v1.3.2/cmder.zip)
- Extract (this takes some time) and copy to c:\cmder\
- Create shortcut to desktop or taskbar
- Set bash shell as 'Default task for new console'

Even if you don't want to use CMDer, you should enable your PowerShell to execute scripts. You're a developer - the terminal is your friend.

```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

#### Bash Tools (wget, curl, etc): Gow

If you're coming from a Unix machine, you might miss commands like curl, diff, grep and many other. Gow is your friend - it's a collection of a 100+ famous Unix tools recompiled for Windows.

```
cinst Gow
```

More info: [https://github.com/bmatzelle/gow/wiki](https://github.com/bmatzelle/gow/wiki)

#### Node

A bunch of tools are powered by Node and installed via npm. This applies to you even if you don't care about Node development. If you want to install tools for React, Azure, TypeScript, or Cordova, you'll need this.

```
cinst nodejs.install
node --version
npm --version
```

Useful node utils

```
npm install rimraf -g
npm install -g serve -g
npm install -g live-server -g
```

### Version Control: Git

Obviously. If you want Git to be able to save credentials (so you don't have to enter SSH keys / passwords every single time you do anything), also install the Git Credential Manager for Windows.

```
cinst git.install
cinst poshgit
# Restart PowerShell / CMDer before moving on - or run
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

cinst Git-Credential-Manager-for-Windows
```

If the git command line gets to complicated you can use the following tools

```
cinst gitkraken
cinst sourcetree
```

#### Code Editor: VS Code

The best editor for (Javascript) development: [Visual Studio Code](https://code.visualstudio.com/)

```
csinst visualstudiocode
```

To make it even better install the following extensions

- EditorConfig for VS Code
- ESLint
- Spelling and Grammer Checker

Alternative you can install Sublime or Atom.

```
cinst SublimeText3
cinst sublimetext3-contextmenu
cinst SublimeText3.PackageControl
cinst SublimeText3.PowershellAlias

cinst Atom
```

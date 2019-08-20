# Setup Windows 10 for Modern/Hipster Development

A fresh Windows isn't entirely ready for modern development, but all the tools you need are available. A good terminal, popular bash tools, Git, a decent package manager - when properly setup, modern development on Windows can be a lot of fun. In particular, this document outlines how to configure your Windows in such a way that it can easily handle most development tasks usually run on a Mac OS X or a Linux distro.

## Package Management: Chocolatey

Chocolatey is a powerful package manager for Windows, working sort of like apt-get or homebrew. Let's get that first. Fire up CMD.exe as Administrator and run:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

Once done, you can install packages by running `cinst` (short for `choco install`). Most packages below will be installed with Chocolatey.

See [https://chocolatey.org/packages?q=repository](https://chocolatey.org/packages?q=repository) for the chocolatey repository

> Many functions/packages require admin rights. When you open the command shell, you should ensure that you do so with "Run as Administrator" selected. If you are attempting to use Chocolatey in a non-administrator setting, you
> must select a different location other than the default install
> location. See [https://chocolatey.org/install#non-administrative-install](https://chocolatey.org/install#non-administrative-install) for details.

## NodeJS

A bunch of tools are powered by Node and installed via npm. This applies to you even if you don't care about Node development. If you want to install tools for React, Azure, TypeScript, or Cordova, you'll need this.

Although you could install NodeJS directly following the steps outlined on the [NodeJS](https://nodejs.org/en/) site, we suggest you to use a version manager for Node.

Use installer: [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

```bash
# install latest version of NodeJS
nvm install stable

# nvm install lts/dubnium (latest LTS)
nvm install lts/dubnium

# list installed versions
nvm list

# switch verions
nvm use 12.8.0
```

Install usefull nodejs development tools

```bash
# fast remove tool
npm install rimraf -g

# http server(s)
npm install serve -g
npm install live-server -g

# cross platform ENV vars
npm install cross-env -g
```

## Git (Version Control)

Obviously. 

```bash
# install git 
cinst git.install
```

Or use the installer: https://git-scm.com/download/win

If you want Git to be able to save credentials (so you don't have to enter SSH keys / passwords every single time you do anything), also install the Git Credential Manager for Windows.

```bash
# password manager for git
cinst Git-Credential-Manager-for-Windows
```

Install & config diff/merge tool 

```
cinst p4merge
```

Configure p4merge

```bash
# c:\users\[yourusername]\.gitconfig
[merge]
    tool = p4merge
[mergetool "p4merge"]
    cmd = p4merge "$BASE" "$LOCAL" "$REMOTE" "$MERGED"
    trustExitCode = false
[diff]
    external = p4mergeDiff.bat
[push]
    default = simple
```

Create a p4mergeDiff bat file to handle diff

```bash
# C:\Program Files\Perforce\p4mergeDiff.bat
p4merge "%2" "%5"
```

Verify p4merge installation

```
git difftool ./README.md
```

## Windows Terminal

If you're a front-end developer - the terminal is your friend. So lets make the best of it.

- Install Windows 10 versie 18362.0 of hoger as a prerequisites

- Install Windows terminal (preview): https://www.microsoft.com/nl-be/p/windows-terminal-preview/9n0dx20hk701

Enable git bash into the Windows terminal (https://stackoverflow.com/questions/56839307/adding-git-bash-to-the-new-windows-terminal)

- Make sure your git command can be run successfully in CMD
- Update the config file profile.json

```json
{ 
    "tabTitle": "Git Bash",
    "acrylicOpacity" : 0.75, 
    "closeOnExit" : true, 
    "colorScheme" : "Campbell", 
    "commandline" : "C:/Program Files/Git/bin/bash.exe --login", 
    "cursorColor" : "#FFFFFF", 
    "cursorShape" : "bar", 
    "fontFace" : "Consolas", 
    "fontSize" : 12, 
    "guid" : "{14ad203f-52cc-4110-90d6-d96e0f41b64d}", 
    "historySize" : 9001, 
    "icon": "ms-appdata:///roaming/git-bash_32px.ico",
    "name" : "Git Bash", 
    "padding" : "0, 0, 0, 0", 
    "snapOnInput" : true, 
    "useAcrylic" : true 
}
```

- The icon can be obtained here: [git-bash_32px.ico](https://raw.githubusercontent.com/yanglr/WindowsDevTools/master/awosomeTerminal/icons/git-bash_32px.ico)
You can add icons for Tab to this location: `%LOCALAPPDATA%\packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState`. Put 32x32 PNG/icons in this folder, and then in profile.json you can reference the image resource with the path starting with `ms-appdata:// .` Test git bash works well in Windows Terminal


If you want to use Powershell, you should enable your PowerShell to execute scripts. 

```
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

## Code Editor: VS Code

The best editor for (Javascript) development: [Visual Studio Code](https://code.visualstudio.com/)

Although there is a csinst for visual studio code, i recommend against it. As all autoupdating apps should never be installed using brew, as they would be outdated. So use the installer: https://code.visualstudio.com/

To make it even better install the following extenstions

- EditorConfig for VS Code
- ESLint
- Path Intellisense
- Spelling and Grammer Checker

## Postman

[https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

## (Optional) Bash Tools (wget, curl, etc): Gow

If you're coming from a Unix machine, you might miss commands like curl, diff, grep and many other. Gow is your friend - it's a collection of a 100+ famous Unix tools recompiled for Windows.

```
cinst Gow
```

More info: [https://github.com/bmatzelle/gow/wiki](https://github.com/bmatzelle/gow/wiki)

## (Optional) GIT UI

If the git command line gets to complicated you can use the following tools

```bash
# install gitkraken (commercial for private repo)
cinst gitkraken 

# or install sourcetree (needs atlassian account)
cinst sourcetree
```



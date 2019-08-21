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

## Windows Terminal

If you're a front-end developer - the terminal is your friend. So lets make the best of it.

- Install Windows 10 versie 18362.0 or hoger 

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
- Color Highlight
- Markdown All in One
- Prettier - Code formatter
- TODO Highlight
- Git Graph
- Git Blame

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

## Verify Correct Installation

Open a bash shell through "Windows Terminal" 

**bash shell**

```bash
# goto user home folder
$ cd ~
~

# show full path
$ pwd
/mnt/c/Users/[yourusername]
```

**cinst**

```bash
# show choco help
$ choco

# list installed packages
$ choco list
```

**NodeJS, npm and nvm**

```bash
# install latest nodejs version
$ nvm install stable
v12.9.0 is already installed.
Now using node v12.9.0 (npm v6.10.2)

# get node version
$ node --version
v12.9.0

# get npm version
$ npm --version
6.10.2

# list global installed modules
$ npm list --global --depth=0
/mnt/c/Users/[yourusername]/.nvm/versions/node/v12.9.0/lib
├── cross-env@5.2.0
├── npm@6.10.2
├── rimraf@3.0.0
└── serve@11.1.0
```

**Git**

```bash
# get git version
$ git --version
git version 2.19.1

# clone bootcamp repo
$ cd ~
$ mkdir git   # proposed default git folder: ~/git
$ cd git
$ git clone https://github.com/Euricom/training-bootcamp-frontend-2019Q3.git
Cloning into 'training-bootcamp-frontend-2019Q3'...
remote: Enumerating objects: 3291, done.
remote: Total 3291 (delta 0), reused 0 (delta 0), pack-reused 3291
Receiving objects: 100% (3291/3291), 33.91 MiB | 16.59 MiB/s, done.
Resolving deltas: 100% (1684/1684), done.
```

**Visual Studio Code**

```bash
# goto bootcamp repo
$ cd ~/git/training-bootcamp-frontend-2019Q3

# open bootcamp repo with vscode
$ code . 

# click on 'Git Graph' in the status bar (if you installed the Git Graph extension)
# you should see the commit graph
```

**p4merge**

```bash
# get configured git merge tool
$ git config --get merge.tool
p4merge 

# get configured git merge tool
$ git config --get diff.tool
p4merge 

# verify correct config
# modify the ./README.md in the bootcamp repo
$ git difftool ./README.md # p4merge should open with the README diffs
# you can also verify the diffs in VSCode
```




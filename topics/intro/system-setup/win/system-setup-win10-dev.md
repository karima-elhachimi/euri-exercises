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
must select a different location other than the default install
location. See [https://chocolatey.org/install#non-administrative-install](https://chocolatey.org/install#non-administrative-install) for details.

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

Usefull node utils

```
npm install rimraf -g
npm install -g serve -g
npm install -g live-server -g
```

#### .NET Core SDK 1.1
.NET Core is a general purpose development platform maintained by Microsoft and the .NET community on [GitHub](https://github.com/dotnet/core). It is cross-platform, supporting Windows, macOS and Linux, and can be used in device, cloud, and embedded/IoT scenarios.

```
cinst dotnetcore-sdk
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

To make it even better install the following extenstions

- EditorConfig for VS Code
- ESLint
- TSLint
- Git History (git log)
- Git Blame
- Git Flow
- beautify
- mssql
- npm Intellisense
- Path Intellisense
- Spelling and Grammer Checker
- Document This
- ES6 Mocha Snippets
- C# for Visual Studio Code

Alternative you can install Sublime or Atom.

```
cinst SublimeText3
cinst sublimetext3-contextmenu
cinst SublimeText3.PackageControl
cinst SublimeText3.PowershellAlias

cinst Atom
```

### Containers: Docker

> The Hyper-V package must be enabled. The Docker for Windows installer will enable it for you, if needed. (This requires a reboot). It is possible that you need to enable 'hardware assisted virtualization and data protection' in the bios.

Install Docker for Windows

```
    Follow 'https://docs.docker.com/docker-for-windows/'
```

Verify your installation

Type the docker run hello-world command and press RETURN.

```
$ docker run hello-world
 Unable to find image 'hello-world:latest' locally
 latest: Pulling from library/hello-world
 535020c3e8ad: Pull complete
 af340544ed62: Pull complete
 Digest: sha256:a68868bfe696c00866942e8f5ca39e3e31b79c1e50feaee4ce5e28df2f051d5c
 Status: Downloaded newer image for hello-world:latest

 Hello from Docker.
 This message shows that your installation appears to be working correctly.
 ...
```

#### MongoDB and tooling

MongoDB

```
cinst mongodb
```

Tooling

```
cinst robomongo
```

## Sqlitebrowser

DB Browser for SQLite

[http://sqlitebrowser.org/](http://sqlitebrowser.org/)

#### Other usefull tooling

- http://storageexplorer.com/

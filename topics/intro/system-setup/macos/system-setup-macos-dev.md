# Setup OSX for Development

A fresh OSX isn't entirely ready for modern development, but all the tools you need are available. A good terminal, popular bash tools, Git, a decent package manager - when properly setup, modern development on OSX can be a lot of fun. In particular, this document outlines how to configure your OSX in such a way that it can easily handle most development tasks.

## Language Setup

System Preferences - Language & Region - Preferred language
Set to English (if not already)

## Terminal

MacOs already has a pretty decent terminal built-in but if you want to use an alternative try ITerm2

    brew cask install iterm2

[Optional] If you want a nice shell with colors and git integration, install zsh
Follow instruction from https://sourabhbajaj.com/mac-setup/iTerm/zsh.html

## XCode

A must have for any Mac development, even for just the command line tools

- Install xcode from [AppStore](https://itunes.apple.com/be/app/xcode/id497799835?mt=12)

- Install command line utilities

```bash
xcode-select --install
```

- Accept the license agreement

```bash
sudo xcodebuild -license accept
```

## [Homebrew](http://brew.sh)

The missing package manager for macOS (or Linux)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Sample commands

    brew list          -- list files in a formula or not-installed formulae
    brew cleanup       -- uninstall unused and old versions of packages
    brew install       -- install a formula (app)
    brew uninstall     -- uninstall a formula
    brew update        -- fetch latest version of Homebrew and all formulae
    brew upgrade       -- upgrade outdated formulae
    brew doctor        -- audits your installation for common issues
    brew tap           -- tap a new formula repository from GitHub
    brew untap         -- remove a tapped repository

Some use full brew packages

```bash
brew install tree
brew install git
brew install git-flow
brew install htop               # CPU usage, available memory
brew install speedtest-cli      # internet speed test
brew install wifi-password      # displays your wifi password
brew install archey             # basic system info
```

### Cask

Cask is a Homebrew plugin that allow to install OSX applications distributed as binaries. Usually you get a dmg file and then drag-n-drop into /Applications - with Cask this process can be automated using the command line.

```bash
# install cask
brew tap caskroom/cask
```

Some use full cask packages

```bash
# Just hold the ⌘-Key a bit longer to get a list of all active short cuts of the current application.
brew cask install cheatsheet

# Additional Quick Look plugins
brew cask install qlcolorcode
brew cask install qlmarkdown
brew cask install quicklook-json
brew cask install suspicious-package

# The missing window manager
brew cask install spectacle

# VLC media player
brew cask install vlc

# App remover
brew cask install appcleaner

# A clipboard manager tool (so you can stop saying damnit when you pressed the keys for copy instead of paste)
brew cask install flycut
```

### Brew Cask update

brew-cask-upgrade is a command-line tool for upgrading every outdated app installed by Homebrew Cask.

Homebrew Cask extends Homebrew and brings its elegance, simplicity, and speed to the installation and management of GUI macOS applications and large binaries alike.

brew-cask-upgrade is an external command to replace the native upgrade by offering interactivity, an improved interface, and higher granularity of what to upgrade.

```bash
brew tap buo/cask-upgrade
```

```bash
# Update outdated casks
brew cu
```

## NodeJS

A bunch of tools are powered by Node and installed via npm. This applies to you even if you don't care about Node development. If you want to install tools for modern web application development you will need this.

Although you could install NodeJS directly following the steps outlined on the [NodeJS](https://nodejs.org/en/) site, we suggest you to use a version manager for Node.

For MacOs the following version managers exist:

- [nvm](https://github.com/creationix/nvm) (preferred)
- [n](https://github.com/tj/n)

To install nvm

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Install latest LTS with nvm

```bash
nvm install lts/*
```

## Version Control: Git

Obviously. If you want Git to be able to save credentials (so you don't have to enter SSH keys / passwords every single time you do anything), also setup the Git Credential helper.

```bash
# install
brew install git

# check installation
git --version

# configure credential manager
git config --global credential.helper cache

# configure user name
git config --global user.name "Mona Lisa"

# configure commit email
git config --global user.email "email@example.com"
```

## Diff/Merge tool

You can install p4merge or BeyondCompare (preferable)

### P4merge

Download [p4merge](https://www.perforce.com/downloads/visual-merge-tool)

```bash
# ~/.gitconfig
[merge]
	tool = p4merge
[mergetool "p4merge"]
    cmd = /Applications/p4merge.app/Contents/Resources/launchp4merge "\"$PWD/$BASE\"" "\"$PWD/$REMOTE\"" "\"$PWD/$LOCAL\"" "\"$PWD/$MERGED\""
	keepTemporaries = false
	trustExitCode = false
	keepBackup = false
[diff]
    tool = p4merge
[difftool "p4merge"]
    cmd = /Applications/p4merge.app/Contents/Resources/launchp4merge "\"$REMOTE\"" "\"$LOCAL\""
	prompt = false
```

### BeyondCompare

Download [http://www.scootersoftware.com/download.php](http://www.scootersoftware.com/download.php)

Add Command Line Tools: Menu - Install Command Line Tools

Config GIT

```bash
# ~/.gitconfig
[diff]
    tool = bcomp
[difftool]
    prompt = false
[difftool "bcomp"]
    trustExitCode = true
    cmd = "/usr/local/bin/bcomp" \"$LOCAL\" \"$REMOTE\"
[merge]
	tool = bcomp
[mergetool]
    prompt = false
[mergetool "bcomp"]
  	trustExitCode = true
    cmd = "/usr/local/bin/bcomp" \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\"
```

Verify installation: change a git tracked file and

```
git difftool ./README.md
```

## Code Editor: VS Code

The best editor for (Javascript) development: [Visual Studio Code](https://code.visualstudio.com/)

Although there is a cask for visual studio code, i recommend against it. As all auto updating apps should never be installed using brew, as they would be outdated.

To make it even better install the following extensions

- EditorConfig for VS Code
- ESLint
- Auto Rename Tag
- Path Intellisense
- Spelling and Grammer Checker
- Code Spell Checker
- Color Highlight
- Markdown All in One
- Prettier - Code formatter
- TODO Highlight
- Git Graph
- Git Blame

Must know shortcuts

- Cmd + F : Find in current File
- Cmd + B : Quickly show and hide the sidebar
- Cmd + J : Quick show and hide the bottom panel
- Cmd + P : Open single file
- Opt + Up / Opt + Down : Easily move the line that the cursor is currently at up or down.
- Cmd + / : Will comment/uncomment code (works in js, html, css, ...)
- Cmd + K + Cmd + S: Open shortcut help

## Postman

[https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

## Some short-cuts & tips

Short-cuts

- **Cmd + Space**: Spotlight search
- **Cmd + Shft + 3**: Take screenshots
- **Cmd + Shft + 4**: Take screenshots of area
- **Cmd + Shft + 4** & space: Take screenshots window
- **Cmd + Opt + D**: Hide your dock
- **Cmd + Opt + Esc**: Force Quit dialog
- **Cmd + Opt + Shft + Esc**: Force Quit current application
- **Cmd + Opt + Ctrl + Eject**: Force shutdown (direct!)
- **Cmd + plus(+) or min(-)**: Zoom in & out

- **fn + BS**: Delete (to remove from the front of the cursor)
- **fn + Up or Down**: Page up / down

Tips

- Us keyboard 'US-international' for all those french characters. Show 'Character viewer' and/or 'Keyboard Viewer' for other symbols.
- When you have a file open (sublime, photoshop, word), you can drag the icon to move the file.
- When you have a file open (sublime, photoshop, word), you can cmd + click the filename in the title to view its location.
- When **Cmd + Tab** switch between application, press **Q** to quit app, **H** to hide it.
- The spotlight search has a calculator build in.

More: http://www.danrodney.com/mac/index.html

## (optional) The Z shell 

If you want a nice shell with colors and git integration, install zsh
Follow instruction from https://sourabhbajaj.com/mac-setup/iTerm/zsh.html

### (optional) GIT GUI

If the git command line gets too complicated you can install the following tools

- [Gitkraken](https://www.gitkraken.com/)
- [SourceTree](https://www.sourcetreeapp.com/)

## (Optional) Marked2 (Markdown Viewer)

[http://marked2app.com/](http://marked2app.com/)

> License: see license file

## (Optional) MacOS Tweaks

#### Finder

```bash

# Finder: allow quitting via ⌘ + Q; doing so will also hide desktop icons
defaults write com.apple.finder QuitMenuItem -bool true

# Finder: show hidden files by default
#defaults write com.apple.finder AppleShowAllFiles -bool true

# Finder: show all filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Finder: show status bar
defaults write com.apple.finder ShowStatusBar -bool true

# Finder: show path bar
defaults write com.apple.finder ShowPathbar -bool true

# Finder: allow text selection in Quick Look
defaults write com.apple.finder QLEnableTextSelection -bool true

# Display full POSIX path as Finder window title
defaults write com.apple.finder _FXShowPosixPathInTitle -bool true

# When performing a search, search the current folder by default
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# Avoid creating .DS_Store files on network volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# Show the ~/Library folder
chflags nohidden ~/Library
```

## Verify Correct Installation

Open an terminal window through "iTerm" app

**Homebrew & Cask**

```bash
# get homebrew versions
$ brew --version
Homebrew/homebrew-core (git revision ea340; last commit 2019-08-20)
Homebrew/homebrew-cask (git revision 8877; last commit 2019-08-20)

# list tools installed with brew
$ brew list
git			readline		yarn
git-flow	openssl			awscli

# list tools installed with cask
$ brew cask list
cheatsheet      qlcolorcode     qlmarkdown
quicklook-json  spectacle       iTerm2

# verify brew
$ brew doctor
Your system is ready to brew.
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
/Users/[yourusername]/.nvm/versions/node/v12.9.0/lib
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

**BeyondCompare**

```bash
# get configured git merge tool
$ git config --get merge.tool
bcomp 

# get configured git merge tool
$ git config --get diff.tool
bcomp 

# verify correct config
# modify the ./README.md in the bootcamp repo
$ git difftool ./README.md # BeyondCompare should open with the README diffs
# you can also verify the diffs in VSCode
```

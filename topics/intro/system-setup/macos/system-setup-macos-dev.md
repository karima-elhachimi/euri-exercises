# Setup OSX for Development

A fresh OSX isn't entirely ready for modern development, but all the tools you need are available. A good terminal, popular bash tools, Git, a decent package manager - when properly setup, modern development on OSX can be a lot of fun. In particular, this document outlines how to configure your OSX in such a way that it can easily handle most development tasks.

## Language Setup

System Preferences - Language & Region - Preferred language
Set to English (if not already)

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

### Cask

Cask is a Homebrew plugin that allow to install OSX applications distributed as binaries. Usually you get a dmg file and then drag-n-drop into /Applications - with Cask this process can be automated using the command line.

```bash
brew tap caskroom/cask
```

```bash
# Just hold the ⌘-Key a bit longer to get a list of all active short cuts of the current application.
brew cask install cheatsheet

# A Quick Look plugin for source code with syntax highlighting
brew cask install qlcolorcode

# A Quick Look plugin for Markdown files
brew cask install qlmarkdown

# A Quick Look plugin for json files
brew cask install quicklook-json

# A window manager
brew cask install spectacle

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

- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

To install nvm

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Install latest LTS

```bash
nvm install lts/*
```

## Terminal

MacOs already has a pretty decent terminal built-in but if you want to use an alternative try ITerm2

    brew cask install iterm2

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

You can install p4merge or BeyondCompare

### P4merge

Download [p4merge](https://www.perforce.com/downloads/visual-merge-tool)

```bash
# ~/.gitconfig
[merge]
	tool = p4merge
[mergetool "p4merge"]
  	keepTemporaries = false
	prompt = false
	trustExitCode = false
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
[mergetool "p4merge"]
  	trustExitCode = true
    cmd = "/usr/local/bin/bcomp" \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\"
```

Verify installation

```
git difftool ./README.md
```

## Code Editor: VS Code

The best editor for (Javascript) development: [Visual Studio Code](https://code.visualstudio.com/)

Although there is a cask for visual studio code, i recommend against it. As all autoupdating apps should never be installed using brew, as they would be outdated.

To make it even better install the following extenstions

- EditorConfig for VS Code
- ESLint
- Path Intellisense
- Spelling and Grammer Checker
- REST Client

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

### (optional) GIT GUI

If the git command line gets too complicated you can install the following tools

- [Gitkraken](https://www.gitkraken.com/)
- [SourceTree](https://www.sourcetreeapp.com/)

## (Optional) Marked2 (Markdown Viewer)

[http://marked2app.com/](http://marked2app.com/)

> License: see license file


## (Optional) MacOS Tweaks

#### Finder

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

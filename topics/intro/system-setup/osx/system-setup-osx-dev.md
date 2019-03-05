## Setup OSX for Modern/Hipster Development

A fresh OSX isn't entirely ready for modern development, but all the tools you need are available. A good terminal, popular bash tools, Git, a decent package manager - when properly setup, modern development on OSX can be a lot of fun. In particular, this document outlines how to configure your OSX in such a way that it can easily handle most development tasks.

## Language Setup

System Preferences - Language & Region - Preferred language
Set to English (if not already)

## XCode

A must have for any Mac development, even for just the command line tools

* Install xcode from [AppStore](https://itunes.apple.com/be/app/xcode/id497799835?mt=12)

* Install command line utilities
```bash
xcode-select --install
```

* Accept the license agreement
```bash
sudo xcodebuild -license accept
```

## [Homebrew](http://brew.sh)
The missing package manager for macOS (or Linux)

``` bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
```

### Sample commands
    brew cleanup       -- uninstall unused and old versions of packages
    brew commands      -- show a list of commands
    brew config        -- show homebrew and system configuration
    brew doctor        -- audits your installation for common issues
    brew info          -- information about a formula
    brew install       -- install a formula
    brew list          -- list files in a formula or not-installed formulae
    brew outdated      -- list formulae for which a newer version is available
    brew pin           -- pin specified formulae
    brew reinstall     -- install a formula anew; re-using its current options
    brew search        -- search for a formula or cask (/regex/ or string)
    brew tap           -- tap a new formula repository from GitHub, or list existing taps
    brew uninstall     -- uninstall a formula
    brew unpin         -- unpin specified formulae
    brew untap         -- remove a tapped repository
    brew update        -- fetch latest version of Homebrew and all formulae
    brew upgrade       -- upgrade outdated formulae

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
```

### Brew Cask update 
brew-cask-upgrade is a command-line tool for upgrading every outdated app installed by Homebrew Cask.

Homebrew Cask extends Homebrew and brings its elegance, simplicity, and speed to the installation and management of GUI macOS applications and large binaries alike.

brew-cask-upgrade is an external command to replace the native upgrade by offering interactivity, an improved interface, and higher granularity of what to upgrade.

```bash
brew tap buo/cask-upgrade
```
```bash
# Upgrade outdated apps
brew cu
```
---

## NodeJS

A bunch of tools are powered by Node and installed via npm. This applies to you even if you don't care about Node development. If you want to install tools for React, Azure, TypeScript, or Cordova, you'll need this.

Install latest version from <br> [https://nodejs.org/en/](https://nodejs.org/en/)

Changing ownership of usr/local. This will benefit you when using node’s package manager, and will mean you won’t have to use sudo when installing into /usr/local:

    sudo chown -R $USER /usr/local

To switch to multiple NodeJS versions

```bash
# install
npm install n -g

# use
n 6.9.4
n
    node/6.2.0
    node/6.5.0
    node/6.7.0
  ο node/6.9.4
    node/7.4.0
```

## Better terminal window

iterm2, a must have for your development.

    brew cask install iterm2

## Version Control: Git

Obviously. If you want Git to be able to save credentials (so you don't have to enter SSH keys / passwords every single time you do anything), also setup the Git Credential helper.

```bash
# install
brew install git

# configure credential manager
git config --global credential.helper cache
```

If the git command line gets to complicated you can install the following tools

```bash
brew cask install gitkraken   # preferred
brew cask install sourcetree
```

## Code Editor: VS Code

The best editor for (Javascript) development: [Visual Studio Code](https://code.visualstudio.com/)

```
brew cask install visual-studio-code
```

To make it even better install the following extenstions

- EditorConfig for VS Code
- ESLint
- npm Intellisense
- Path Intellisense
- Spelling and Grammer Checker
- Prettier

## Marked2 (Markdown Viewer)

[http://marked2app.com/](http://marked2app.com/)

> License: see license file

## Beyond Compare

[http://www.scootersoftware.com/download.php](http://www.scootersoftware.com/download.php)

Command Line Tools

    Menu - Install Command Line Tools

Setup SourceTree for Beyond Compare:

    Visual Diff Tool: Other
    Diff Command:/usr/local/bin/bcomp
    Parameters:$LOCAL $REMOTE
    Merge Tool: Other
    Merge Command:/usr/local/bin/bcomp
    Paramters:$LOCAL $REMOTE $BASE $MERGED

> License: see license file

## Other usefull utilities

First you need to pre-install 'caskroom' (see above)

    brew tap caskroom/cask

Then you can

    brew cask install grandperspective
    brew cask install spectacle
    brew cask install appcleaner
    brew cask install beyond-compare  (license required)

    ## Always good to perform cleanup at the end
    brew cleanup

And

- http://pilotmoon.com/popclip/ (easy copy/past)
- http://marked2app.com/ (markdown)
- http://cord.sourceforge.net/ (remote desktop)
- https://cyberduck.io/ (FTP, SFTP, WebDav, ...)
- http://www.videolan.org (the video player)

## Dot files

Auto configure:

    cd ./bootstrap
    ./bootstrap.sh

More utilities:
See https://github.com/mathiasbynens/dotfiles
See https://github.com/KingScooty/dotfiles

## Quick Look

Copy \*.qlgenerator to /Library/QuickLook or ~/Library/QuickLook
And restart finder

## Some short-cuts & tips

For dummies:

![OSX Keys](http://faculty.cs.gwu.edu/~timwood/wiki/lib/exe/fetch.php/learn:key-symbols.gif)

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
- When you have a file open (sublime, photoshop, word), you can drap the icon to move the file.
- When you have a file open (sublime, photoshop, word), you can cmd + click the filename in the title to view its location.
- When **Cmd + Tab** switch between application, press **Q** to quit app, **H** to hide it.
- The spotlight search has a calculator build in.

More: http://www.danrodney.com/mac/index.html

## MacOS Tweaks

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

More info: https://github.com/mathiasbynens/dotfiles/blob/master/.osx

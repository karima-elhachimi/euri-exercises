---
title: Git Introduction
verticalSeparator: ---//
---

# Git, a distributed version control system

<img src="./images/git.png" style="background-color:#f0efe7"/>

---

## Create a new repository

```bash
# either create a new directory and type
mkdir git-intro
cd git-intro
git init

# or let git create the new folder for you
git init git-intro
cd git-intro

```

---

## Show working tree status

```bash
git status
```

> On branch master
>
> No commits yet
>
> nothing to commit (create/copy files and use "git add" to track)

---

## Create our very first commit

```bash

# add a README.md
echo "# git-intro" >> README.md

# add the file to the index
git add README.md

# Commit the file (only in local HEAD)
git commit -m "Added Readme"
```

---

## Log

```bash
# Show all commits
git log

# Show only last 2 commits
git log -2

# Condensed view
git log --pretty=oneline

# ASCII art, decorated
git log --graph --oneline --decorate --all

# See files changed
git log --name-status
```

---

## Create our second commit

```bash
# Ignore node_modules directories
ECHO "node_modules/" > .gitignore

# Ignore macos related finder leftovers
ECHO ".DS_Store" >> .gitignore

# Add everything to the index
git add .

# Lets review are changes
git difftool --cached

# Commit (vi oh no (I to insert, esc :wq to save and quit))
git commit
```

---

## Remote

- create a personal repository online in github call it git-intro (no license nor a readme)

```bash
# Add the remote
git remote add origin git@github.com:[user]/git-intro.git

# Push changes to github
git push
```

> FAIL: The current branch master has no upstream branch

```bash
git push --set-upstream origin master
```

---

## Branching

```bash
# create a local branch
git checkout -b FEAT-1

# Change the title of our repository readme
echo "# Introduction into Git" > README.md

# Add to index (do not forget to review changes)
git add .

# Commit
git commit -m 'Changed title'

# Push branch online
git push --set-upstream origin FEAT-1
```

---

## Updating with remote

- Add the dist/ folder to .ignore using github

```bash
# Switch back to master branch
git checkout master

# Check to see if there are any updates to master branch
git fetch

# Update local branch with remote changes
git pull
```

---

## Update our FEAT-1 branch

```bash
# Switch to FEAT-1 branch
git checkout FEAT-1

# Merge changes in master into our branch
git merge master

# Push to github (branch already has upstream)
git push
```

---

## Create our third commit

- First add a line to our readme trough github

```bash
# Switch to master
git checkout master

# Add a subtitle
ECHO "## Subtitle" >> README.md
git add .
git commit -m 'Added subtitle'

# Push online
git push
```

> This will fail because the remote has diverged from your local branch

---//

```bash
# Get the changes
git fetch

# Show tree status
git status
```

> On branch master
> Your branch and 'origin/master' have diverged,
> and have 1 and 1 different commits each, respectively.
> (use "git pull" to merge the remote branch into yours)

---//

### Option 1: Pull

```bash
# Get the changes
git pull

# Merge the conflicts
git mergetool

# Add only the README.md
git add README.md

# Show status
git status

# Conclude the merge
git commit

```

> This will lead to a merge commit

---//

### Undo changes

```bash
# Use git reflog to find the commit sha of Added Subtitle
git reflog

# Reset to commit sha
git reset [commit-sha] --hard
```

---//

### Option 2: Rebase local changes

```bash
# Get the changes
git pull --rebase

# Merge the conflicts
git mergetool

# Continue the rebase
git rebase --continue

# Show status (See no merge commit)
git status

# Push
git push
```

---

## Integrate changes from FEAT-1 branch

```bash
# Merge changes
git merge FEAT-1

# Resolve the conflict using our mergetool
git mergetool

# Conclude the merge
git commit

# Push the changes
git push
```

---//

### Remove remote and local branch

```bash
# Delete the remote branch
git push origin :FEAT-1

# Delete the local branch
git branch -d FEAT-1
```

---//

## Want to learn more?

- local

```bash
git help {command}
```

- [online](https://git-scm.com/)

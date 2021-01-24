# Getting Started with Source Control

[Git Bash Download](https://git-scm.com/downloads)

[Git Extensions for Windows](https://sourceforge.net/projects/gitextensions/)

[Git Graph VS Code](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

[Git History Diff](https://marketplace.visualstudio.com/items?itemName=huizhou.githd)

## Labs

[Version Controlling with Git in Azure Repos - Exercises 1 - 5](https://www.azuredevopslabs.com/labs/azuredevops/git/)

## Learning Labs:

[Introduction to Git](https://docs.microsoft.com/en-us/learn/modules/intro-to-git/)

[Learning Path - Introduction to version control with Git](https://docs.microsoft.com/en-us/learn/paths/intro-to-vc-git/)

# Git / Github Essentials

## Configuration

Set User and E-Mail

```
git config --global user.name "Your Name"
git config --global user.email "your.email@yourdomain.com
```

Unset Credentials

```
git config --global --unset credential.helper
```

## Basic Git Commands

Init Git:

```
git init
```

Add all files to Git:

```
git add .
```

Add a specific file to Git:

```
git add file.txt | *.ts
```

Commit files:

```
git commit -m "your checkin comment"
```

## Status & Updates

Show Commit logs:

```
git log
```

Check for remote updates:

```
git remote update
```

Show Status (Adds/Delets/Changes):

```
git status
```

## Branching

List Branches:

```
git branch
```

Create Branch:

```
git branch feature/myfeature
```

Push new Branch to remote:

```
git push origin [name_of_your_new_branch]
```

Switch to Branch:

```
git checkout [name_of_your_branch]
```

> Note: When switching branches it is always good advice to check the status with `git status` on a windows machine. When there are changes from other branches on the disk you can clean the branch using `git clean -f`

Merge Branch:

```
git merge [branch_to_merge]
```

> Note: You might have to switch to the branch that you might want to merge into befor executing merge

## Dealing with special Commits

Get a spcific Commit:

```
git checkout <sha1>
```

sha1:

![commits](_images/commits.png)

![sha1](_images/sha1.png)

> Note: This will result in a detached Head.

If you want to delete your changes associated with the detached HEAD:

```
git checkout master
```

If you want to keep the detached state save it into a new branch and continue from there:

```
git branch save-detached-head
```

> Note: You will have to switch to the branch you saved to afterwards

## Tags

Create Lightweight tag :

```
git tag -l v1.1.0
```

Create Annotated tag :

```
git tag -a v2.0.1 -m "fixed Bug on replaced data layer. do not use v.2.0.0"
```

List all tags:

```
git tag
```

Show a specific tag:

```
git show v2.0.1
```

Push tags to Remote:

```
git push origin v2.0.1 | git push --tags
```

Delete tag:

```
git tag -d v2.0.1
```

Checkout tag:

```
git checkout 2.0.1
```

## Configure ignored files

To Configure ignored files add a `.gitignore` file to the root of your project. A valid `.gitignore` file can be generated at https://www.gitignore.io/

## Remotes

A Remote is a GIT Repo on a Git Server, typically in the cloud, like GitHub.

Adding Remotes:

```
git remote add origin https://github.com/try-git/try_git.git
```

Pull / Push from / to repository:

```
git pull / git push
```

## Forking Workflow - Getting Updates for Class Demos

![forking-wf](_images/forking-workflow.jpg)

Original Repo could be: `https://github.com/ARambazamba/AZ-204` where `ARambazamba` is the `original-owner-github-username` and `AZ-204` is the `reponame`

### Listing the current Remotes

List the current configured remote repository for your fork.

```
git remote -v
> origin  https://github.com/your-github-username/reponame.git (fetch)
> origin  https://github.com/your-github-username/reponame.git (push)
```

Specify a new remote upstream repository that will be synced with the fork.

### Adding the Repo of the original owner as Upstream

```
git remote add upstream https://github.com/original-owner-github-username/reponame.git
```

Verify the new upstream repository you've specified for your fork.

```
git remote -v
> origin    https://github.com/your-github-username/reponame.git (fetch)
> origin    https://github.com/your-github-username/reponame.git (push)
> upstream  https://github.com/original-owner-github-username/reponame.git (fetch)
> upstream  https://github.com/original-owner-github-username/reponame.git (push)
```

### Getting Updates

Fetch from Upstream:

```
 git fetch upstream
 git merge upstream/master
 git push origin master
```

## Working with Submodules

Add a Submodule:

```
git submodule add https://github.com/ARambazamba/FoodApp FoodApp
git commit -m foodapp-submodule
```

Updating a Submodule to it's latest commit:

```
git submodule update --remote --merge
```

> Note: I use submodules to include samples in classes that are used in different classes or to shorten / avoid path problems in devops

## Git-flow

[Gitflow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

> Note: Require GIT 2.24.0+ - Check with `git --version`

Initialize repo for gitflow:

```
git flow init
```

Start a new feature:

```
git flow feature start MYFEATURE
```

Finish feature:

```
git flow feature finish MYFEATURE
```

Publish a feature:

```
git flow feature publish  MYFEATURE
```

Start a release:

```
git flow release start RELEASE
```

Finish a release:

```
git flow release finish  RELEASE
```

## Additional Labs & Walkthroughs

[Introduction to version control with Git](https://docs.microsoft.com/en-us/learn/paths/intro-to-vc-git/)

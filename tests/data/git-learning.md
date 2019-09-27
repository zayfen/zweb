---
title: Git常用操作总结
author: 张云峰 
date: 2019-09-11 03:10:12
categories: git
tags:
 - git
---
> 作者： 张云峰

![https://res.cloudinary.com/zayfen/image/upload/v1568171685/img/l8yeyxvtfw6kplg1ci67.png](https://res.cloudinary.com/zayfen/image/upload/v1568171685/img/l8yeyxvtfw6kplg1ci67.png)

### 漂亮打印git log
```sh
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --date=relative
```

### 添加修改或者新文件到待commit队列
```sh
### add 的文件是支持正则匹配的
git add <file(s)>

### add all changes to commiter queue
git add .

### 查看某个commit的修改内容
git show <commit-id>
git diff <commit-id>^!
##### e.g. git show d34ff657f5   git diff d34ff657f5^!
```

### 提交已添加的文件到本地仓库并创建一个新的版本
```sh
git commit -m "commit message"

### also can combine git add & git commit in one command
git commit -m "commit message" -a
```

### 推送到远程仓库
```sh
### origin 是仓库名（默认就是origin），branch_name 是分支名
git push origin <branch-name>
```

## 仓库
### 创建一个仓库
```bash
### from existed repo 
git clone <repo-url>

### create a new local repo
git init [<local-directory>]
```


## 分支
### 查看分支
```sh
### 查看本地分支
git branch

### 查看本地和远端的分支
git branch -va

### 查看本地分支和远程分支的对应关系
git remote show <repo-name> ## git remote show origin
```

### 创建分支
```sh
### 仅仅创建一个新分支在本地
git checkout <new-branch-name>

### 创建一个分支，并且将工作区切换到新创建的分支
git checkout -b <new-branch-name>

### 拉取远程分支到本地，并切换分支
git checkout -b <local-branch-name> <repo-name>/<remote-branch-name>
#### e.g.: git checkout -b test origin/test

### 把远程分支拉取到本地，不切换分支 (--tranck 选项现在是默认的了)
git branch <local-branch-name> <repo-name>/<remote-branch-name> [--track]
#### e.g.: git branch test origin/test
```

### 将本地分支推送到远程仓库
```bash
## 远程分支不存在的情况
### remote-name: 通常是 origin； local-branch-name: 本地分支名； remote-branch-name: 要创建的远程分支名
 git push <remote-name> <local-branch-name>:<remote-branch-name>
 
 ## 远程分支存在的情况（但是没有关联）
 ### 首先关联本地分支和远程分支
 git push -u <remote-name> <branch-name>
 #### or
 git branch --set-upstream-to=<remote-name>/<remote-branch> <local-branch>
```

### 更新分支
```bash
### 跟新本地分支
git pull

### 更新远程分支信息
git remote update

### 使用远程的代码强制更新本地的代码 （强制本地代码和线上的一致）v1.0
git checkout .
git pull

### 使用远程的分支代码强制更新本地的代码（强制本地代码和线上的一致）v2.0
git fetch --all
git reset --hard origin/master
git pull
```

## Tag

### 创建tag
```bash
git tag -a <tag-name> -m <tag-message>
```

### 删除tag
```bash
### 删除本地tag
git tag -d <tag-name>

### 删除远端tag
git push --delete <repo-name> <tag-name>
or 
git push <repo-name> :refs/tags/<tag-name>

### e.g.: git push --delete origin tag-r0
### e.g.: git push origin :refs/tags/tag-r0
```

### 查看tag
```bash
### 查看所有的tag
git tag

### 查看单个tag
git tag -l <tag-name>

### 查看一个tag的具体信息
git show <tag-name>
```

### 推送tag到远程
```sh
## push single tag
git push <remote-name> <tag-name>

## push all tags (not recommended)
git push --tags
```


### 撤销工作目录所有的更改（包括新创建的文件）
```sh
git reset --hard # removes staged and working directory changes

## !! be very careful with these !!
## you may end up deleting what you don't want to
## read comments and manual.
git clean -f -d # remove untracked
git clean -f -x -d # CAUTION: as above but removes ignored files like config.
git clean -fxd :/ # CAUTION: as above, but cleans untracked and ignored files through the entire repo (without :/, the operation affects only the current directory)
```


### git仓库存储账号密码，不用每次都输入账号密码（针对https协议的仓库地址）
```bash
$ git config credential.helper store
$ git push https://github.com/owner/repo.git

Username for 'https://github.com': <USERNAME>
Password for 'https://USERNAME@github.com': <PASSWORD>

## 执行完上面的命令之后，以后所有的push都不再需要提交代码

## 如果想让此功能有个时间限制，可以这样

git config --global credential.helper 'cache --timeout 7200'

## 7200秒后失效，push需要重新输入账号密码
```

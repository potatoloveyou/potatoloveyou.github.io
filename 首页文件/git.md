git --version


cmd  
dir 列出当前目录下所有目录与文件  ls
cd 进入某个目录 
rm 
cat 
touch 创建新文件


git init 初始化  创建版本库 .git 

git add file  某个文件  
git add . 所有文件  添加到  暂存区
  
git commit -m "第一次提交"   提交到 版本库



工作区 暂存区 版本库（仓库区） 区别？

git log 查看版本记录

git status 查看当前版本库的状态



git restore file  撤销工作区的修改
git restore --staged file  撤销暂存区的修改


版本回退
git reset --hard HEAD^^^
git reset --hard xxxyyyzzz


git reflog

分支

github 托管代码

git remote add origin git@github.com:FindIndex/xxx.git
git branch -M main
git push -u origin main

关联远程仓库错误
git remote get-url origin
git remote set-url origin git@github.com:FindIndex/xxx.git
git remote get-url origin


github pages 托管静态网站
findindex.github.io 仓库名
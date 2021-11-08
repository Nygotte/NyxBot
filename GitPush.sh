#!/bin/bash

git status
git add .
git status 
git commit -m "NyxBot"
git branch -M master
git config --global user.email "ny.lucax@gmail.com" 
git remote add origin https://github.com/Nygotte/NyxBot.git
git push origin master 

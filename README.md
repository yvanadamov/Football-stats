# Football-stats

v0.0.3

## Synopsis

The purpose of the project is to retrieve odd dropping data and to analyze it via mongo DB. Different analyzation tools will be further added. At the end of the project, we expect followed points to be covered:
- trying to make this "a big data" project
- trying to find relation between odd dropping and final result of football matches

## Motivation

The project was inspired by the idea that we can:
- find a correlation between odd dropping and final result of matches
- increase personal skills in nodejs, mongo DB, big data at all...
A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Download/clone latest version of the project.
Dependencies:
- request
- mongoose

If you are newbie and you want to run this application from scratch, you can find below steps for Windows 7 OS:

```
1. Make sure you've downloaded some Git client (Desktop GitHub is good enough for novice users). Download can be done from here: https://desktop.github.com/
2. Once you're done with this step, it is now time to make a new account in GitHub, if you don't have such. New account can be created here: https://github.com/join
3. Download NodeJS and Node package manager on your computer. For this purpose go to https://nodejs.org/en/download/
4. Download dependencies ('request' and 'mongoose' via NodeJS package manager). For this purpose, follow steps, described here:
https://www.npmjs.com/package/mongoose
and the same for 'request' package
5. Clone (download) dependencies' repos. If you decided to use Desktop GitHub, the steps can be found here: https://help.github.com/desktop/guides/contributing/cloning-a-repository-from-github-to-github-desktop/ . It is good to mention it will be fine if you have separate folder and enough disk space (let's say 20 GB will be fine). 
6. Go in installation directory and run `node ..\Football-stats\scripts\scripts\insert\script.js`
```

## Contributing

Thanks to [Oddsmath](http://www.oddsmath.com/), which is (unofficially) used to retrieve match data

## Authors

## License

The entire project is under the [MIT license](http://opensource.org/licenses/mit-license.php)

##TODO list:

```
To disucss:
1. `models` to be part of `db` folder; or perhaps to rename it?

Known issues to be fixed:
1. Close connection to mongoose if job is done
2. In case data exists in mongoose, replace it. For this purpose, make sure data is not there before inserting it in the collection

Documentation: 
1. Better explanation of Contribution section https://gist.github.com/PurpleBooth/b24679402957c63ec426
2. Adding "Authors" section as in given example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
3. Revise databases/README.md file
4. Adding overall architecture diagram in README
5. Describe meaning of different controllers

Job to be done:
1. Revise (add/remove/update) configurations in scripts/config directory
2. Add analyzation module + Add analyzation strategies of odd dropping
3. Add schedule job to make real time queries
4. Dump old data once done with all bug fixes

Optimizations:
1. Regex in get ids function

Future job:
1. Add more championships in `retrieve data` module
2. Adding basic AI module
3. Stress test
```
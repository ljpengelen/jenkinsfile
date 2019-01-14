# Getting Started with Jenkins Pipelines as Code

This repository contains

* a shell script to run Jenkins in a Docker container,
* a simple front end that can be hosted in the form of static files,
* a simple back end that can deployed in the form of a Docker container, and
* a Jenkinsfile that declares the pipelines for continuous integration and continuous deployment of these apps.

Before running `run-jenkins-with-docker.sh`, change the line that reads `-v /Users/lucengelen/Repositories:/Users/lucengelen/Repositories \` so that the folder where you keep your repositories is accessible from the Docker container.
This allows you to use file URLs to point Jenkins to Git repositories on you local machine.
This, in turn, makes it possible to quickly test changes to your Jenkinsfile without pushing those changes.
If that's not something you'd want to do, simply remove the line.

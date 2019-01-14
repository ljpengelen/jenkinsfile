projectId = "jenkinsfile-demo"

pipeline {
  agent none

  options {
    ansiColor("xterm")
  }

  stages {
    stage("Test back end") {
      agent {
        dockerfile {
          filename "back-end/dockerfiles/ci/Dockerfile"
          label "webapps"
        }
      }

      steps {
        sh "cd back-end && pylint -E app tests"
        sh "cd back-end && black --check app tests"
        sh "cd back-end && pytest --cov=app"
      }
    }

    stage("Test front end") {
      agent {
        dockerfile {
          args "-u root"
          filename "front-end/dockerfiles/ci/Dockerfile"
          label "webapps"
        }
      }

      steps {
        sh "yarn config set -- --modules-folder /app/node_modules"
        sh "cd front-end && bin/ci"
      }
    }
  }
}

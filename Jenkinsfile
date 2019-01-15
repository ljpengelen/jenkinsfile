projectId = "jenkinsfile-demo"

dokkuHostname = "kabisa-dokku-demo-production.westeurope.cloudapp.azure.com"
if (env.BRANCH_NAME == "experiment") {
  dokkuHostname = "kabisa-dokku-demo-staging.westeurope.cloudapp.azure.com"
}

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
        sh "cd back-end && bin/ci"
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
        sh "ln -s /app/node_modules front-end/node_modules"
        sh "cd front-end && bin/ci"
      }

      post {
        always {
          sh "chown -R \$(stat -c '%u:%g' .) \$WORKSPACE"
        }
      }
    }

    stage("Deploy back end") {
      agent {
        label "webapps"
      }

      when {
        anyOf {
          branch 'experiment';
          branch 'production'
        }
      }

      steps {
        sh "git push -f dokku@${dokkuHostname}:back-end HEAD:refs/heads/master"
      }
    }

    stage("Build front end") {
      agent {
        dockerfile {
          args "-u root -e 'API_BASE_URL=http://${dokkuHostname}:8000/api'"
          filename "front-end/dockerfiles/ci/Dockerfile"
          label "webapps"
        }
      }

      when {
        beforeAgent true
        anyOf {
          branch 'experiment';
          branch 'production'
        }
      }

      steps {
        sh "cd front-end && yarn build"
      }

      post {
        always {
          sh "chown -R \$(stat -c '%u:%g' .) \$WORKSPACE"
        }
      }
    }
  }
}

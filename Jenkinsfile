additionalBuildArgs = "--pull"
if (env.BRANCH_NAME == "master") {
  additionalBuildArgs = "--pull --no-cache"
}

dokkuHostname = "kabisa-dokku-demo-staging.westeurope.cloudapp.azure.com"
if (env.BRANCH_NAME == "production") {
  dokkuHostname = "kabisa-dokku-demo-production.westeurope.cloudapp.azure.com"
}

pipeline {
  agent none

  options {
    ansiColor("xterm")
  }

  triggers {
    cron(env.BRANCH_NAME == 'master' ? '@weekly' : '')
  }

  stages {
    stage("Test back end") {
      agent {
        dockerfile {
          additionalBuildArgs "${additionalBuildArgs}"
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
          additionalBuildArgs "${additionalBuildArgs}"
          args "-u root"
          filename "front-end/dockerfiles/ci/Dockerfile"
          label "webapps"
        }
      }

      steps {
        sh "rm -f front-end/node_modules && ln -s /app/node_modules front-end/node_modules"
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
          branch 'staging';
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
          branch 'staging';
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

    stage("Deploy front end") {
      agent {
        label "webapps"
      }

      when {
        anyOf {
          branch 'staging';
          branch 'production'
        }
      }

      steps {
        sh "rm -rf deploy-front-end"
        sh "git clone dokku@${dokkuHostname}:front-end deploy-front-end"
        sh "rm -rf deploy-front-end/dist"
        sh "mkdir -p deploy-front-end/dist"
        sh "cp -R front-end/dist/* deploy-front-end/dist"
        sh "touch deploy-front-end/.static"
        sh "cd deploy-front-end && git add . && git commit -m \"Deploy\" --allow-empty && git push -f"
      }
    }
  }
}

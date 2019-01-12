projectId = "jenkinsfile-demo"

additionalBuildArgs = "--pull"
if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == null) {
  additionalBuildArgs = "--pull --no-cache"
}

dokkuHostname = "kabisa-dokku-demo-production.westeurope.cloudapp.azure.com"
if (env.BRANCH_NAME == "staging") {
  dokkuHostname = "kabisa-dokku-demo-staging.westeurope.cloudapp.azure.com"
}

pipeline {
  agent none

  options {
    ansiColor("xterm")
  }

  stages {
    stage("Check out") {
      agent {
        label "webapps"
      }

      steps {
        checkout scm
      }
    }

    stage("Test back end") {
      agent {
        dockerfile {
          additionalBuildArgs "${additionalBuildArgs}"
          args "-u root"
          filename "back-end/dockerfiles/ci/Dockerfile"
          label "webapps"
        }
      }

      steps {
        sh "cd /app && pylint -E app tests"
        sh "cd /app && black --check app tests"
        sh "cd /app && pytest --cov=app"
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
        sh "cd /app && bin/ci"
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
          additionalBuildArgs "${additionalBuildArgs}"
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
        sh "cd /app && yarn build"
        sh "rm -rf front-end/dist"
        sh "mkdir front-end/dist"
        sh "cp /app/dist/* ./front-end/dist"
      }

      post {
        always {
          sh "chown -R \$(stat -c '%u' .) \$WORKSPACE"
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
        sh "cd deploy-front-end && git add . && git commit -m \"Deploy\" --allow-empty && git push"
      }
    }
  }
}

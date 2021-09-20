pipeline {
  agent any
  environment {
      CI = 'true'
  }
  stages {
    stage('Initialize Node.js 16.x in Docker') {
      agent {
        docker {
          image 'node:16-alpine'
        }
      }
      stages {
        stage('Dependencies') {
          milestone 1
          steps {
            sh 'npm ci --cache=".KaraokeCache"'
          }
        }
        stage('Build') {
          milestone 2
          steps {
            sh 'npm run build'
          }
        }
        // stage('Unit Test') {
        //   steps {
        //     sh 'npm run unit'
        //   }
        // }
      }
    }
    lock(resource: 'gcp-deploy') {
      milestone 3
      stage('Deploy') {
        agent {
          docker {
            image 'gcr.io/google.com/cloudsdktool/cloud-sdk:alpine'
            args '-u root'
          }
        }
        environment {
            GOOGLE_PROJECT_ID = 'soa-karaoke'
            GOOGLE_SERVICE_ACCOUNT_KEY = credentials('google_service_acccount_key_soa_karaoke')
        }
        steps {
          //Deploy to GCP
          sh """
            gcloud config set project ${GOOGLE_PROJECT_ID};
            gcloud auth activate-service-account --key-file \$GOOGLE_SERVICE_ACCOUNT_KEY;

            gcloud app deploy --version=${BUILD_NUMBER};
            echo "Deployed to GCP"
            """
        }
        post {
          always {
            println "Result : ${currentBuild.result}"
          }
        }
      }
    }
  }
}

pipeline {
  agent{
    docker {
      image 'node:16-alpine'
      args '-p 3000:3000'
    }
  }
  environment {
    CI = 'true'
  }
  stages {
    stage('Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }
    stage('Dependencies') {
      steps {
        sh 'npm ci --cache=".KaraokeCache"'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm run unit'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'npm run start'
      }
    }
  }
}
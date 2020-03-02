pipeline {
    agent {
        docker {
            image 'node:13.8.0-alpine3.10'
            args '-p 4000:4000'
        }
    }
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install -g yarn'
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
    }
}
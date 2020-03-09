pipeline {
    agent {
        docker {
            image 'node:13.8.0-alpine3.10'
            args '-p 4000:4000'
        }
    }
    environment { 
        CI = 'true'
        HOME = '.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'yarn install'
                sh 'yarn build'
                withCredentials([file(credentialsId: 'ormconfig-test1', variable: 'ormconfig')]) {
                    sh "cp \$ormconfig /dist/ormconfig.json"
                }
                sh 'ls dist'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'node dist/index.js'
            }
        }
    }
}
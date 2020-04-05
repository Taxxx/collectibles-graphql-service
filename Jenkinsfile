pipeline {
    agent none
    environment { 
        CI = 'true'
        HOME = '.'
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:13.8.0-alpine3.10'
                }
            }
            steps {
                sh 'yarn global add pm2'
                sh 'yarn install'
                sh 'yarn build'
                withCredentials([file(credentialsId: 'ormconfig-test1', variable: 'ormconfig')]) {
                    sh "cp \$ormconfig dist/ormconfig.json"
                }
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:13.8.0-alpine3.10'
                }
            }
            steps {
                sh 'yarn test'
            }
        }
        stage('Docker Deploy') {
            agent any
            steps {
                dir('dist') {
                    sh 'docker build -t collectibles-graphql-service .'
                    sh 'docker run -p 4000:4000 -d collectibles-graphql-service'
                }
            }
        }
    }
}
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
                sh 'mkdir ~/.npm-global'
                sh 'npm config set prefix "~/.npm-global"'
                sh 'npm install pm2 -g'
                sh 'pm2'
                sh 'yarn install'
                sh 'yarn build'
                withCredentials([file(credentialsId: 'ormconfig-test1', variable: 'ormconfig')]) {
                    sh "cp \$ormconfig dist/ormconfig.json"
                }
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'pm2 start dist/ecosystem.config.js --only collectibles-graphql-service'
            }
        }
    }
}
pipeline {
    agent any
    environment {
            GIT_URL = "https://github.com/matusaurio/payments-ui"
            IMAGE_NAME = "payments-ui"
        }
    stages {
        stage('GetFromGithub') {
            steps {
                git branch: 'main', url: GIT_URL
            }
        }
        stage('Application build') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker image build') {
            steps {
                sh 'docker image build -t${IMAGE_NAME} .'
            }
        }

        stage('Update docker-compose to use the new version') {
            steps {
                sh 'sudo -u student /usr/local/bin/docker-compose -f /home/student/docker-compose.yaml up -d'
            }
        }

    }
}
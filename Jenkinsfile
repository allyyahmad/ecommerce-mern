pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/AliAhmad3892/ecommerce-mern.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yml down'
                sh 'docker compose -f docker-compose-jenkins.yml up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'sleep 15'
                sh 'docker compose -f docker-compose-jenkins.yml ps'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully! Application is up and running.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}

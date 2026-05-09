pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        // ---- EDIT THESE TWO BEFORE FIRST RUN -----------------------------
        APP_REPO   = 'https://github.com/AliAhmad3892/ecommerce-mern.git'
        TESTS_REPO = 'https://github.com/AliAhmad3892/ecommerce-mern-tests.git'
        // ------------------------------------------------------------------
        COMPOSE_FILE    = 'docker-compose-jenkins.yml'
        COMPOSE_PROJECT = 'forever'
    }

    stages {

        stage('Clone Application') {
            steps {
                git branch: 'main', url: env.APP_REPO, credentialsId: 'github-pat'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                  set -eu
                  docker compose -p $COMPOSE_PROJECT -f $COMPOSE_FILE down -v || true
                  # Auto-detect EC2 public IP (IMDSv2 token-based, with fallback)
                  TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60" --max-time 3 || true)
                  EC2_PUBLIC_IP=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" --max-time 3 http://169.254.169.254/latest/meta-data/public-ipv4 || true)
                  if [ -z "$EC2_PUBLIC_IP" ]; then EC2_PUBLIC_IP=$(hostname -I | awk '{print $1}'); fi
                  export EC2_PUBLIC_IP
                  echo "Bringing stack up against EC2 IP: $EC2_PUBLIC_IP"
                  docker compose -p $COMPOSE_PROJECT -f $COMPOSE_FILE up -d --build
                  echo "Waiting for services to become reachable..."
                  sleep 30
                  docker compose -p $COMPOSE_PROJECT -f $COMPOSE_FILE ps
                '''
            }
        }

        stage('Clone Test Suite') {
            steps {
                dir('tests') {
                    git branch: 'main', url: env.TESTS_REPO, credentialsId: 'github-pat'
                }
            }
        }

        stage('Run Selenium Tests (containerized)') {
            steps {
                sh '''
                  set -eu
                  cd tests
                  docker build -t selenium-tests:latest .
                  NETWORK="${COMPOSE_PROJECT}_default"
                  docker network inspect "$NETWORK" >/dev/null 2>&1 || \
                      NETWORK=$(docker network ls --filter "name=${COMPOSE_PROJECT}" --format '{{.Name}}' | head -n1)
                  echo "Joining docker network: $NETWORK"
                  docker run --rm \
                      --network "$NETWORK" \
                      -e BASE_URL=http://jenkins_frontend:5175 \
                      -e ADMIN_URL=http://jenkins_admin:5176 \
                      -e API_URL=http://jenkins_backend:4000 \
                      -v "$PWD":/tests \
                      -w /tests \
                      selenium-tests:latest \
                      pytest --html=report.html --self-contained-html
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker compose -p $COMPOSE_PROJECT -f $COMPOSE_FILE ps'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'tests/report.html', allowEmptyArchive: true
            script {
                // Email goes to the author of the commit that triggered this build
                def pusherEmail = sh(
                    script: "git log -1 --pretty=format:'%ae' || true",
                    returnStdout: true
                ).trim()
                if (!pusherEmail?.contains('@')) {
                    pusherEmail = 'qasimalik@gmail.com'   // safe fallback
                }
                echo "Notifying pusher: ${pusherEmail}"

                emailext(
                    to: pusherEmail,
                    subject: "[Forever CI] ${currentBuild.fullDisplayName} — ${currentBuild.currentResult}",
                    mimeType: 'text/html',
                    body: """
                        <h3>Build ${currentBuild.currentResult}</h3>
                        <ul>
                          <li><b>Job:</b> ${env.JOB_NAME}</li>
                          <li><b>Build:</b> #${env.BUILD_NUMBER}</li>
                          <li><b>Triggered by commit author:</b> ${pusherEmail}</li>
                          <li><b>Console:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></li>
                        </ul>
                        <p>The full Selenium HTML report is attached.</p>
                    """,
                    attachmentsPattern: 'tests/report.html'
                )
            }
        }
        success { echo 'Pipeline succeeded — application is up and tests passed.' }
        failure { echo 'Pipeline failed — see console output and attached report.' }
    }
}

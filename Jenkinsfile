pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS_ID = 'github-credentials'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        DOCKER_HUB_REPO = 'a6j0n/mern-chat-app-backend'    // Replace with your Docker Hub repository
        DOCKER_IMAGE_TAG = 'latest' // Default tag for Docker image
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/T07U9FKNLG7/B07V2NY3T8R/<token>'  // Replace this with your actual webhook URL
    

    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git branch: 'main', credentialsId: "${GITHUB_CREDENTIALS_ID}", url: 'https://github.com/mallikharjuna160003/Hackathon.git'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build your application here
                    sh 'echo "Building the application..."'
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    // Log in to Docker Hub
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                    }
                    // Build the Docker image
                    def image = docker.build("${DOCKER_HUB_REPO}:${DOCKER_IMAGE_TAG}", "-f backend/Dockerfile backend")                    
                    // Push the Docker image to Docker Hub
                    image.push()
                }
            }
        }
    }
    
    		post {
			success {
				
				script {
					sh """
					curl -X POST -H 'Content-type: application/json' --data '{"text":"Backend image build & push to dockerhub succeeded!"}' ${SLACK_WEBHOOK_URL}
					"""
				}
			}
			failure {
				script {
					sh """
					curl -X POST -H 'Content-type: application/json' --data '{"text":"Build failed!"}' ${SLACK_WEBHOOK_URL}
					"""
				}
			}
			always {
				echo 'Pipeline completed.'
				cleanWs()  // Clean the workspace after the pipeline execution
			}
		}
    
    
    
}

export SONAR_SCANNER_OPTS="-Djavax.net.ssl.trustStorePassword="

sonar-scanner \
  -Dsonar.host.url=http://sonarqube.nimesh.lab \
  -Dsonar.login=squ_cebcd4d7457ad140127cfdb421a2de630c3e6374


docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

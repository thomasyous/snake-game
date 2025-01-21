export SONAR_SCANNER_OPTS="-Djavax.net.ssl.trustStorePassword="

sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqa_630f909445eec0a5991bcd7986b123a9d63e7255


docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

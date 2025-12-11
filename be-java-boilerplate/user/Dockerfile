FROM openjdk:17-alpine
EXPOSE 9150
ARG APP_NAME="user"
ARG APP_VERSION="0.0.1"
ARG JAR_FILE="/build/libs/${APP_NAME}-${APP_VERSION}-SNAPSHOT.jar"
###
### add this to run latest deployment of this service
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

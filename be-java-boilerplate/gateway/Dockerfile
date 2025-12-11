FROM openjdk:17-alpine
EXPOSE 9080
ARG APP_NAME="gateway"
ARG APP_VERSION="0.0.1"
ARG JAR_FILE="/build/libs/${APP_NAME}-${APP_VERSION}-SNAPSHOT.jar"
##
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
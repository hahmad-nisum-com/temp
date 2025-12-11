FROM openjdk:17
EXPOSE 8090
ARG APP_NAME="notification"
ARG APP_VERSION="0.0.1"
ARG JAR_FILE="/build/libs/${APP_NAME}-${APP_VERSION}-SNAPSHOT.jar"
##
COPY ${JAR_FILE} app.jar
RUN mkdir notification
ENTRYPOINT ["java", "-jar", "app.jar"]
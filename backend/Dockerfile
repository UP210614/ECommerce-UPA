# backend/Dockerfile
FROM openjdk:17-jdk-alpine3.14

ARG JAR_FILE=build/libs/p03-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

RUN apk update && apk add --no-cache mysql-client bash iputils

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN addgroup backend && adduser -S -G backend backend
USER backend:backend
#ENTRYPOINT ["./wait-for-it.sh", "db", "--", "java", "-jar", "/app.jar"]
# ENTRYPOINT ["java","-jar","/app.jar"]
# RUN addgroup backend && adduser -S -G backend backend
# USER backend
# WORKDIR /app
# COPY p03-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java","-jar","/app.jar"]
# EXPOSE 8080
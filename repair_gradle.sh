#!/bin/bash
# Script to repair Gradle wrapper JAR if it gets corrupted during Git/ZIP transfer
echo "Repairing Gradle Wrapper JAR..."
mkdir -p android/gradle/wrapper
curl -L https://github.com/gradle/gradle/raw/v8.14.3/gradle/wrapper/gradle-wrapper.jar -o android/gradle/wrapper/gradle-wrapper.jar
chmod +x android/gradlew
echo "Successfully repaired gradle-wrapper.jar for version 8.14.3"

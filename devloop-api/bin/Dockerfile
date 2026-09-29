# 1. Imagem base do Java (JDK 17)
FROM eclipse-temurin:17-jdk-alpine

# 2. Pasta de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia o arquivo .jar gerado pela compilação para dentro do contêiner
COPY target/*.jar app.jar

# 4. Porta que a aplicação Spring Boot expõe
EXPOSE 8080

# 5. Comando para executar a aplicação quando o contêiner subir
ENTRYPOINT ["java", "-jar", "app.jar"]
# Use a imagem Node.js como base
FROM node:18 as build-stage

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos para o contêiner
COPY . .

# Construa a aplicação Vue.js
RUN npm run build

# Exponha a porta 8080 para tráfego externo
EXPOSE 8080

# Comando para iniciar o servidor Vue.js
CMD ["npm", "run", "serve"]
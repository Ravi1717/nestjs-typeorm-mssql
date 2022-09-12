FROM node:14-alpine
WORKDIR /app
ADD package.json ./
RUN npm config set registry http://registry.npmjs.org
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]


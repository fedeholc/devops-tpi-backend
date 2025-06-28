FROM node:22

# Set locale for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache clean --force && npm install --verbose

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

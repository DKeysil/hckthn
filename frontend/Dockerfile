FROM node:alpine
ENV NODE_ENV=production
WORKDIR /home/frontend
COPY . .
RUN yarn install
RUN yarn build

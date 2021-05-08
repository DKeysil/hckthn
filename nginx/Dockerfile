FROM node:latest as build-stage
WORKDIR /frontend
COPY ./frontend/package.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

FROM nginx:1.14 as production-stage
RUN rm -f /etc/nginx/conf.d/default.conf||true
RUN mkdir -p /frontend
COPY --from=build-stage /frontend/dist /frontend
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
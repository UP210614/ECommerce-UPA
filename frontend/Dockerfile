# FROM node:20.5.0-alpine3.18
# RUN addgroup front && adduser -S -G front front
# USER front
# WORKDIR /app/
# COPY --chown=front package*.json .
# RUN npm install
# COPY --chown=front . .
# RUN npm run build
# CMD ["npm", "run", "start"]

# FROM node:20.5.0-alpine3.18 as build-stage
# RUN addgroup front && adduser -S -G front front
# USER front
# WORKDIR /app/
# COPY --chown=front package*.json .
# RUN npm install
# COPY --chown=front . .
# RUN npm run build

# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20.5.0-alpine3.18 as build-stage
RUN addgroup front && adduser -S -G front front
USER front
WORKDIR /app/
COPY --chown=front package*.json .
RUN npm install
COPY --chown=front . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


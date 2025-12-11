FROM node:20.18.0 AS builder


WORKDIR /app
ARG MODE=prod
ENV VITE_APP_ENV=production
ENV VITE_API_URL=http://74.235.123.22/api/v1/


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --mode $MODE

FROM nginx:stable-alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

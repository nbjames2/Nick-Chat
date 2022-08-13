#build environment
FROM node:16-alpine as build
ENV NODE_ENV production
ENV VITE_FIREBASE_APIKEY=
ENV VITE_FIREBASE_AUTHDOMAIN=
ENV VITE_FIREBASE_DATABASEURL=
ENV VITE_FIREBASE_PROJECTID=
ENV VITE_FIREBASE_STORAGEBUCKET=
ENV VITE_FIREBASE_SENDERID=
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
RUN yarn install
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
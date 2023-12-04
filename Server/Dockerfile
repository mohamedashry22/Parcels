FROM node:18.17

WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV=dev
ENV JWT_SECRET=Demo_PARCEL
ENV useMongoDB=true
ENV FRONTEND_URL=http://localhost:7200
ENV MONGO_URI=mongodb://ashry:ashry@mongo/parcelDB?authSource=admin

COPY package*.json ./

RUN npm install
RUN npm install nodemon -g

COPY . .

EXPOSE 6500
EXPOSE 9229

CMD ["node", "--inspect=0.0.0.0:9229", "index.js"]
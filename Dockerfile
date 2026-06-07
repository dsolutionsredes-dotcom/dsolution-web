FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install next@14.2.23 react@18.3.1 react-dom@18.3.1 framer-motion lucide-react
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0

EXPOSE 80

CMD ["npm", "run", "start"]

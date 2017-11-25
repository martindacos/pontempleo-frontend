FROM node
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y git
RUN git clone https://github.com/martindacos/pontempleo-frontend.git
RUN npm -v
RUN cd pontempleo-frontend && npm install

EXPOSE 8000

CMD cd pontempleo-frontend && npm start

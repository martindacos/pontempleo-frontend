FROM nginx
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y git
RUN git clone https://github.com/martindacos/pontempleo-frontend.git

EXPOSE 80

CMD

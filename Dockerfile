FROM nginx
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y git
RUN rm -r /usr/share/nginx/html
RUN cd /usr/share/nginx && git clone https://github.com/martindacos/pontempleo-frontend.git html
RUN apt-get install -y nano

EXPOSE 80

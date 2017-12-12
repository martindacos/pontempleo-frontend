FROM nginx
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y git
RUN rm -r /usr/share/nginx/html
RUN cd /usr/share/nginx && git clone https://github.com/martindacos/pontempleo-frontend.git html
RUN cd /usr/share/nginx/pontempleo-frontend && cp default.conf /etc/nginx/conf.d
RUN apt-get install -y nano

EXPOSE 18000

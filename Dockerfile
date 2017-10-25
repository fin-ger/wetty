FROM node:0.10.38
MAINTAINER Nathan LeClaire <nathan@docker.com>

ADD . /app
WORKDIR /app
RUN npm install
RUN apt-get update
RUN apt-get install -y git tig nano emacs-nox vim
RUN useradd -d /home/talk -m -s /bin/bash talk
RUN echo 'talk:ovgu' | chpasswd

EXPOSE 4123

ENTRYPOINT ["node"]
CMD ["app.js", "-p", "4123"]

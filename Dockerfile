FROM node:8

ADD etc /etc
RUN apt-get update
RUN apt-get install -y git tig nano emacs-nox vim zsh less

ADD . /app
WORKDIR /app
RUN npm install

RUN useradd -d /home/talk -m -s /bin/zsh talk
RUN echo 'talk:ovgu' | chpasswd

USER talk
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
ADD zshrc /home/talk/.zshrc
USER root

EXPOSE 4123

ENTRYPOINT ["node"]
CMD ["app.js", "-p", "4123"]

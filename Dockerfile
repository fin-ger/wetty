FROM node:9-stretch

ADD etc /etc
RUN apt-get update
RUN apt-get install -y git tig nano emacs-nox vim zsh less tmux wget curl locales
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
RUN locale-gen

ADD . /app
WORKDIR /app
RUN npm install
RUN npm rebuild

RUN useradd -d /home/talk -m -s /bin/zsh talk
RUN echo 'talk:ovgu' | chpasswd

USER talk
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
ADD zshrc /home/talk/.zshrc
USER root
RUN chown talk:talk /home/talk/.zshrc

EXPOSE 4123

ENTRYPOINT ["node"]
CMD ["app.js", "-p", "4123"]

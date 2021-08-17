FROM ubuntu:20.04

ENV TZ=Europe/Moscow

ARG REACT_APP_API_IP
ENV REACT_APP_API_IP=$REACT_APP_API_IP

LABEL maintainer="my@image.co.il"

RUN export DEBIAN_FRONTEND="noninteractive" \
    && apt-get update \
    && apt-get upgrade -y  \
    && apt-get install git curl gnupg2 unzip -y > /dev/null 2>&1

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN curl -sL https://deb.nodesource.com/setup_14.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh > /dev/null 2>&1
RUN apt-get install -y nodejs > /dev/null 2>&1

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - > /dev/null 2>&1
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list > /dev/null 2>&1
RUN apt-get update \
    && apt-get install yarn -y > /dev/null 2>&1

RUN npm install -g json-server
RUN adduser --disabled-password --gecos '' project
WORKDIR /home/project/react-app

RUN echo '{"private": "true"}' > package.json

RUN mkdir node-modules
RUN mkdir build
RUN yarn add @reduxjs/toolkit react react-dom react-icons react-redux react-scripts web-vitals > /dev/null 2>&1

CMD ["/home/project/react-app/run.sh"]
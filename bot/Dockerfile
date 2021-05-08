FROM python:3.8.6

LABEL MAINTAINER="dkeysil dkeysil@protonmail.com"

WORKDIR /bot
ADD ./requirements.txt /bot/requirements.txt
RUN pip install -r requirements.txt
ADD . /bot

CMD python -u run.py

FROM python:3.9-alpine

ENV PYTHONBUFFERED 1

<<<<<<< HEAD
RUN apk add bash postgresql-dev gcc python3-dev musl-dev
=======
RUN apk add postgresql-dev gcc bash python3-dev musl-dev
>>>>>>> develop-docker

RUN pip install --upgrade pip && pip install pipenv
COPY ./backend/Pipfile* /tmp/
RUN cd /tmp && pipenv lock --requirements > requirements.txt && pip install -r requirements.txt

RUN mkdir /app
<<<<<<< HEAD
WORkDIR /app
=======
WORKDIR /app
>>>>>>> develop-docker

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN adduser -D user
USER user
<<<<<<< HEAD
=======

>>>>>>> develop-docker

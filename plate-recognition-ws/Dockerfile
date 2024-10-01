FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openalpr openalpr-daemon openalpr-utils libopenalpr-dev python3 python3-pip

WORKDIR /app

VOLUME /app

COPY ./app/requirements.txt requirements.txt


RUN python3 -m pip install pip==20.3.4
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py"]

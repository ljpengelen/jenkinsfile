FROM python:3.7.4-slim-buster

RUN apt-get update \
  && apt-get -y install \
    python3-pip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

RUN pip3 install --no-cache pipenv

RUN groupadd -g 999 appuser \
  && useradd -r -u 999 -g appuser appuser

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN mkdir /app \
  && chown 999:999 /app

WORKDIR /app

EXPOSE 8000

ENV APP_ENV production

COPY back-end/Pipfile* ./

RUN pipenv install --system --ignore-pipfile

COPY back-end .

USER appuser

CMD ["gunicorn", "app.app:APP", "-b", "0.0.0.0", "-c", "gunicorn.cfg"]

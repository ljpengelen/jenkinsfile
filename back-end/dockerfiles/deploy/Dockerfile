FROM ubuntu:artful

RUN apt-get update \
  && apt-get -y install \
    python3-pip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

RUN pip3 install --no-cache pipenv

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /app

EXPOSE 8000

ENV APP_ENV=production

COPY back-end/Pipfile* ./

RUN pipenv install --system --ignore-pipfile

COPY back-end .

CMD ["gunicorn", "app.app:APP", "-b", "0.0.0.0", "-c", "gunicorn.cfg"]
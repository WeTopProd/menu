FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt /app

RUN pip3 install --upgrade pip && pip3 install -r ./requirements.txt --no-cache-dir

COPY ./ /app
CMD ["python3", "manage.py", "makemigrations"]
CMD ["python3", "manage.py", "migrate"]
CMD ["python3", "manage.py", "runserver", "0:8000"]
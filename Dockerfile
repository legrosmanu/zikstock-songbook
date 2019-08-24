FROM python:3

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

CMD [ "python", "./src/run.py" ]

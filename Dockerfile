FROM alpine:latest

RUN apk --no-cache add npm

WORKDIR /app

COPY . .

CMD ["sh", "run.sh"]

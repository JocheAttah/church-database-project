FROM golang:1.16.3-alpine3.13

WORKDIR /app

COPY . .

# Download and install the dependencies:
RUN go get -d -v ./...

# Build the go app
RUN go build -o github.com/jocheattah/golang-church-database .

EXPOSE 8000

CMD ["./github.com/jocheattah/golang-church-database"]
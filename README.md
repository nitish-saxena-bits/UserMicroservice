# UserMicroservice

docker network create user-network

docker pull mysql

docker run --name mysql_user-container -e MYSQL_ROOT_PASSWORD=<> --network user-network --network-alias user_ms-net -dp 127.0.0.1:3306:3306 mysql

docker build -t user_ms-image .

docker run --name user_ms-container -e USERMS_PORT=8089 -e MYSQL_HOST=user_ms-net -e MYSQL_USER=root -e MYSQL_PASSWORD=<> -e MYSQL_DB=UserDB --network user-network -dp 127.0.0.1:80:8089 user_ms-image
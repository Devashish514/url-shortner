# URL_SHORTNER PROJECT....

-> The main function of the project is to provide the functionality to user to shortened their longUrl into something easy to read and write similar to link shortener service like Bitly or TinyURL.

# Points Required to Implement 

1. Each shortened URL will remain stored for 30 days.
2. If the stored URL is used/accessed withing 30 days , its storing time will increase by 1 day on every request.
3. URLs can be added more than once,but the shortened strings/Url's need to be unique.
4. Need to implement Authentication and protect the routes.


# prequesites:
1. NodeJs v16.0.0
2. Docker Installed
3. Postgres
4. pgAdmin v4
5. redis-cli


# The Backend Enviorment used in this project is NodeJs with javaScript(ES_6), for DB, I've used POSTGRES with Sequelize ORM.

# The project is deployed on Docker Container, and to run the application on docker you have use the following commands:

1. sudo apt-get install update;
2. sudo apt install docker-compose

3. sudo docker-compose up --build -d  # --> to build the app in docker container and run containers.

4. sudo docker images --> to get all the images in docker.

# once you run the command 3, so the services will be running on their indivisual conatiner on specified ports and we can communicate with them using our API Endpoints.

5. sudo docker ps -a  --> to get all the containers list

# To check the logs from the server_Conatainer use :
6. sudo docker logs "conatiner_Name/conatiner-ID"

# To start/Stop conatiner:
7. sudo docker start/stop "conatiner-Name/conatiner_id"

# To remove all containers :
8. sudo docker-compose down 


# FOR API ENDPOINTS DOCUMENTATION, REFER http://localhost:3000/api-docs, after running the server on your machine.
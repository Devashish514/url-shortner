# URL_SHORTNER PROJECT....
The main function of the project is to provide the functionality to user to shortened their longUrl into something easy to read and write similar to link shortener service like Bitly or TinyURL.

## Points Required to Implement 

1. Each shortened URL will remain stored for 30 days.
2. If the stored URL is used/accessed within 30 days , its storing time will increase by 1 day on every request.
3. URLs can be added more than once,but the shortened strings/Url's need to be unique.
4. Need to implement Authentication and protect the routes.


## prequesites:
1. `NodeJs v16.0.0`
2. `Docker Installed`
3. `Postgres`
4. `pgAdmin v4`
5. `redis-cli`

## The Backend Enviorment used in this project is NodeJs with javaScript(ES6), for DB, I've used POSTGRES with Sequelize ORM.


## Authors

- [@Devashish514](https://github.com/Devashish514)


## Documentation

[ FOR API ENDPOINTS DOCUMENTATION](https://fun-size-url.onrender.com/api-docs)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`DB_PASSWORD`

`REDIS_URL`

`DATABASE_URL`

`DATABASE_HOST`


## Installation and Commands

clone url-shortner with `git clone projectLink` command

```bash
  cd url-shortner
  npm install --save
```
Docker commands:
```bash
1. sudo apt-get install update;
2. sudo apt install docker-compose

3. sudo docker-compose up --build -d  //to build the app in docker and run containers.

4. sudo docker images --> to get all the images in docker.

# once you run the command 3, so the services will be running on their indivisual conatiner on specified ports and we can communicate with them using our API Endpoints.
5. sudo docker ps -a  --> to get all the containers list

# To check the logs from the server_Conatainer use :
6. sudo docker logs "conatiner_Name/conatiner-ID"

# To start/Stop conatiner:
7. sudo docker start/stop "conatiner-Name/conatiner_id"

# To remove all containers :
8. sudo docker-compose down 

# To use container's bash terminal :
sudo docker exec -it "containerId" "bash/psql/etc...."

```
## refer "nginx.conf" file for load balancing and cluster modifications..

```bash
pm2 monit  # To monitor the load and cpu performance of clusters.

# For  Loadtesting..
npm install loadtest -g --save;

loadtest "server link/URL" -t 20 -c 10 -rps 100;
# loadtest for 20 sec with concurrency of 10 request @ 100 request per second.


```
    
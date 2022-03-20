to run docker compose

```
  ./build.sh
```
then build the docker image

```
  ./dockerbuild.sh
```


In docker-compose.yml we have REACT_APP_SERVER_BASE_URL currently set to http://localhost:8080.
If the env var is missing the app defaults to "http://localhost:8080"


```
   docker-compose up  
```

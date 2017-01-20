minikube config set memory 4096
minikube start
eval $(minikube docker-env)

sbt editsource:clean editsource:edit
kubectl create -f deploy/kubernetes/registry.yml

docker build -t localhost:5000/data61/magda-metadata-local:latest -f deploy/docker/api.local.dockerfile deploy/docker
docker push localhost:5000/data61/magda-metadata-local:latest

docker build -t localhost:5000/data61/elasticsearch-kubernetes:2.4.1 -f deploy/docker/elasticsearch-kubernetes.dockerfile deploy/docker
docker push localhost:5000/data61/elasticsearch-kubernetes:2.4.1

kubectl create -f target/kubernetes/local.yml
minikube service api
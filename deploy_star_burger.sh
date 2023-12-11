#!/bin/bash
set -e
cd /opt/pets-service
source .env
git pull
docker-compose down --rmi local
docker-compose up --build -d
docker-compose exec backend python manage.py migrate --noinput
docker-compose exec backend python manage.py collectstatic --noinput
commit_version=$(git rev-parse --verify HEAD)
echo $'\nSuccessful deployment'

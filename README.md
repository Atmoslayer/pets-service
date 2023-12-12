# Сайт для владельцев домашних животных
Сервис для регистрации домашних животных. Позволяет пользователю регистрироваться, добавлять, просматривать и редактировать информацию о
своих питомцах. Вся архитектура организована по REST API с использованием технологий DRF и Angular 16.
# Как установить
## Как запустить dev-версию сайта
Для запуска сайта нужно запустить **одновременно** бэкенд и фронтенд, в двух терминалах.
### Как запустить бэкенд (dev-версия)
Скачайте код:
```sh
git clone https://github.com/atmoslayer/pets-service.git
```
Перейдите в каталог проекта:
```sh
cd pets-service
```
Python 3 уже должен быть установлен. 
**Важно!** Версия Python должна быть не ниже 3.6.
Возможно, вместо команды `python` здесь и в остальных инструкциях этого README придётся использовать `python3`. Зависит это от операционной системы и от того, установлен ли у вас Python старой второй версии.
В каталоге проекта создайте виртуальное окружение:
```sh
python -m venv venv
```
Активируйте его. На разных операционных системах это делается разными командами:
- Windows: `.\venv\Scripts\activate`
- MacOS/Linux: `source venv/bin/activate`
Установите зависимости в виртуальное окружение:
```sh
pip install -r requirements.txt
```
Создайте файл `.env` в каталоге `pets-service` и определите в нем следующие переменные:
- При запуске на сервере определите переменную окружения `ALLOWED_HOSTS` и положите туда ip-адрес сервера;
- Определите переменную окружения `SECRET_KEY`;
- Определите переменную `DEBUG`;
- В проекте используется база данных Postgresql, для её работы требуется указать следующие переменные:
  - `POSTGRES_PASSWORD` - пароль для доступа к postgres;
  - `POSTGRES_HOST` - хост для работы с postgres. Если сайт запускается с помощью
  docker, то значением данной переменной должно быть название контейнера с базой данных;
  - `POSTGRES_PORT` - порт, для работы postgres. По умолчанию устанавливается значение `5432`, менять его не рекомендуется;
  - `POSTGRES_USER` - пользователь для работы с базой данных. Не стоит путать с djando superuser, он создается отдельно;
  - `POSTGRES_DB` - название базы данных;
  - `PGDATA` - директория для хранения данных;

#### Пример заполненного файла `.env`
```sh
SECRET_KEY=django-insecure-fdewqlljjfnvbt
DEBUG=True
ALLOWED_HOSTS=127.0.0.1
POSTGRES_PASSWORD=strong_password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=atmoslayer
POSTGRES_DB=petsservice
PGDATA=/var/lib/postgresql/data
```
#### Команды для конфигурации БД
Запустите миграции следующей командой:
```sh
python manage.py migrate
```
Для пользования административной панелью создайте пользователя с помощью команды
```sh
python manage.py createsuperuser
```
После конфигурации БД можно переходить к запуску сервера.
Используйте команду:
```sh
python manage.py runserver
```
**Важно!** Обратите внимание, что данная команда используется только для запуска сайта dev-режиме, поэтому для его корректной работы 
[переменная окружения](#пример-заполненного-файла-env) `DEBUG` должна иметь значение `True`
Откройте сайт в браузере по адресу [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/), если административная панель открывается, сайт работает.
## Как собрать фронтенд (dev-версия)
Для работы сайта в dev-режиме необходима одновременная работа сразу двух программ, поэтому дальнейшие инструкции необходимо выполнять в отдельном терминале.
[Установите Node.js](https://nodejs.org/en/), если у вас его ещё нет.
Проверьте, что Node.js и его пакетный менеджер корректно установлены. Если всё исправно, то терминал выведет их версии:
```sh
nodejs --version
# v16.16.0
# Если ошибка, попробуйте node:
node --version
# v16.16.0
npm --version
# 8.11.0
```
Версия `nodejs` должна быть не младше `10.0` и не старше `16.16`. Лучше ставьте `16.16.0`, на ней тестировался проект. Версия `npm` не важна. Как обновить Node.js читайте в статье: [How to Update Node.js](https://phoenixnap.com/kb/update-node-js-version).
Перейдите в каталог проекта и установите пакеты Angular/cli:
```sh
cd pets-service/frontend
npm install -g @angular/cli@16.1.0
npm install @angular-devkit/build-angular --force
```
Команда может запрашивать ввод дополнительных данных, в этом случае используйте `Y`, `N`.
Собранный фронтенд запускается командной: 
```sh
ng serve 
```
Откройте сайт в браузере по адресу [http://127.0.0.1:4200/](http://127.0.0.1:4200/), если сайт сразу перебрасывает на страницу входа, значит он работает корректно.
## Как запустить prod-версию сайта
Необходимо выполнить все пункты для работы сайта в [dev-режиме](#как-собрать-бэкенд--dev-версия-)
Необходимо добавить в файл `.env` следующие настройки, если вы ещё этого не сделали:
- `DEBUG` — Поставьте `False`.
- `SECRET_KEY`
- `ALLOWED_HOSTS` — [см. документацию Django](https://docs.djangoproject.com/en/3.1/ref/settings/#allowed-hosts)

Так как при отключенном дебаг-режиме требуется использовать отдельный веб-сервер для статики, необходимо установить и настроить [nginx](https://nginx.org/ru/)
В конфиге настроек nginx требуется указать путь к каталогу статики и медиа, а так же настроить [reverse-proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
и адреса работы сайта.
#### Пример конфига nginx для данного проекта:
```sh
server {
    server_name <server ip>;
    location /media/ {
        alias /opt/pets-service/media/;
    }
    location /static/ {
        alias /opt/pets-service/staticfiles/;
    }
    location / {
        include '/etc/nginx/proxy_params';
        proxy_pass http://127.0.0.1:4200/;
    }
    location /api/ {
        include '/etc/nginx/proxy_params';
        proxy_pass http://127.0.0.1:8080/;
    }
    location /admin/ {
        include '/etc/nginx/proxy_params';
        proxy_pass http://127.0.0.1:8080/;
    }
```
Команда запуска бэкенда на сервере будет отличаться. После активации виртуального окружения и установки зависимостей используйте:
```sh
gunicorn -w 5 -b 127.0.0.1:8080 pets_viewer.wsgi:application
```

### Как собрать фронтенд (prod-версия):
Необходимо выполнить все пункты для работы сайта в [dev-режиме](#как-собрать-фронтенд--dev-версия-)
Для production версии используется следующая команда для запуска фронтенда:
```sh
ng serve --disable-host-check
```
## Как запустить prod-версию сайта с помощью сервиса docker/docker-compose
[Docker](https://docs.docker.com/engine/install/) и [docker-compose](https://docs.docker.com/compose/install/) должны быть установлены. В Docker Desktop и в новых версиях docker
плагин уже установлен, но синтаксис его использование в таком случае отличается
от плагина, установленного отдельно. В проекте содержится деплойный скрипт, упрощающий работу с docker, чтобы им пользоваться рекомендуется отдельно установить
плагин docker-compose версии не младше `1.19`. Рекомендуется установить версию `2.20.3`, именно она тестировалась в проекте.
Проверьте, что docker и docker-compose корректно установлены. Если все исправно, терминал выведет
их версии:
```sh
docker version
# Client:
#  Version:           24.0.5

docker-compose version
# Docker Compose version v2.20.3
```
Проверьте все [настройки переменных окружения](#пример-заполненного-файла-env), убедитесь, что
проделали действия, [описанные выше](#как-собрать-бэкенд--dev-версия-), в том числе и те, которые требуются для [работы сайта в режиме production](#как-запустить-prod-версию-сайта).
Обратите внимание, что для работы сайта, развернутого через docker так же требуется установленный и [настроенный nginx](#пример-конфига-nginx-).
### Запуск с помощью инструкции docker-compose
Перейдите в каталог проекта.
Проект запускается командой
```sh
docker-compose up --build -d
```
Данная команда соберет все образы, контейнеры и запустит их в общей сети.
При запуске в данном режиме сайт будет готов к работе, но его база данных будет пуста, а так же будут отсутствовать миграции, их придется
применить вручную. Для этого подключитесь к запущенному контейнеру с помощью команды:
```sh
docker exec -it backend /bin/bash
```
Вы окажетесь в терминале запущенного контейнера. Здесь можно выполнить миграции, создать супер-пользователя и загрузить локации с помощью
[команд конфигурации БД](#команды-для-конфигурации-бд).
По окончании настройки БД выйти из контейнера можно с помощью команды:
```sh
exit
```
### Запуск с помощью деплойного скрипта
Проект содержит деплойный скрипт, который подтягивает изменения с GitHub, а затем пересобирает контейнеры на основе новых образов и делает миграции.
**Важно** Деплойный скрипт использует инструкцию `git pull` для загрузки и установки актуального кода. Для пользования скриптом вам необходимо либо вручную
убрать эту инструкцию из файла скрипта, либо использовать для запуска собственный GitHub репозиторий, предварительно скопированный с данного.
Перед запуском скрипта выполните:
```sh
chmod ugo+x deploy_pets_service.sh
```
Затем активируйте скрипт следующей командой:
```sh
./deploy_pets_service.sh
```
## Цели проекта 
Код написан в рамках тестового задания на позицию Backend разработчика в компанию Indoors Navigation.
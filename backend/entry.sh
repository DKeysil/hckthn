#!/bin/sh

docker-compose run web python manage.py shell -c "from entry_script import create_objects;create_objects();exit()"
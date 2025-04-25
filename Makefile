start:
	docker-compose down -v
	docker container prune 
	docker-compose build --no-cache && docker-compose up -d
	docker-compose logs -f

init-db:
	docker-compose down -v
	docker-compose build --no-cache && docker-compose up -d
	npx prisma migrate dev --name init
	docker-compose down && docker-compose build && docker-compose up

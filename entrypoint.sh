cd src
npx sequelize-cli db:migrate  
npx sequelize-cli db:seed:undo:all  
npx sequelize-cli db:seed:all 
cd .. 
npx nodemon ./server.js

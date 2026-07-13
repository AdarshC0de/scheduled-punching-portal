# Server

- npm init -y
- npx tsc --init
- npm install express cors dotenv helmet compression morgan
- npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/morgan

- npm install prisma @prisma/client
- npx prisma init
- npx prisma generate

- npx prisma migrate dev --name init

- npm install jsonwebtoken bcrypt multer zod exceljs nodemailer ssh2-sftp-client swagger-ui-express yamljs
- npm install -D @types/jsonwebtoken @types/bcrypt @types/multer @types/swagger-ui-express
- npm i --save-dev @types/compression

- npm uninstall typescript
- npm install -D typescript@5.8.3

- npm uninstall prisma @prisma/client
- npm install prisma@6.16.2 @prisma/client@6.16.2

# Client

- npm create vite@latest client
- npm install
- npm install react-router-dom axios @tanstack/react-query zustand react-hook-form zod
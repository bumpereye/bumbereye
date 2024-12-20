# Step 1: Use official Node.js image as the base for the build
FROM node:20-alpine AS build

# Step 2: Set the working directory for the app
WORKDIR /app

# Step 3: Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Step 4: Install app dependencies using Yarn
RUN yarn install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS application
RUN yarn build

# Step 7: Create a smaller production image
FROM node:20-alpine

# Step 8: Set the working directory for the app
WORKDIR /app

# Step 9: Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock
COPY --from=build /app/.env /app/.env

# Step 11: Start the NestJS app
CMD ["node", "dist/main"]
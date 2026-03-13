FROM node:22-alpine

WORKDIR /app

# Install yarn
RUN corepack enable

# Copy root package files
COPY package.json yarn.lock ./

# Install root dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

EXPOSE 3001

CMD ["yarn", "dev", "--host", "0.0.0.0"]

# Menggunakan Node.js versi 18 (atau yang sesuai dengan aplikasi Anda)
FROM node:22.11.0

# Set working directory
WORKDIR /usr/src/

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Menyalin seluruh file aplikasi ke dalam container
COPY . .

# Menyediakan port yang akan digunakan
EXPOSE 8080

# Menjalankan aplikasi
CMD ["npm", "start"]

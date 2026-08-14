#!/bin/sh
set -e

echo "⏳ Aguardando banco de dados..."
node wait-for-db.js

echo "🔄 Sincronizando schema com o banco de dados..."
npx prisma db push --accept-data-loss

echo "🚀 Iniciando servidor..."
exec npm start

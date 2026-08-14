#!/bin/sh
set -e

echo "⏳ Aguardando banco de dados..."
for i in $(seq 1 30); do
  if node -e "import('@prisma/client').then(() => process.exit(0)).catch(() => process.exit(1))" > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "🔄 Sincronizando schema com o banco de dados..."
npx prisma db push --accept-data-loss

echo "🚀 Iniciando servidor..."
exec npm start

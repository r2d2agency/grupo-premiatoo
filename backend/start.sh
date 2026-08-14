#!/bin/sh
set -e

echo "⏳ Aguardando banco de dados..."
# Aguarda até 30s pelo PostgreSQL ficar disponível
for i in $(seq 1 30); do
  if npx prisma db pull --print > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "🔄 Sincronizando schema com o banco de dados..."
npx prisma db push --accept-data-loss

echo "🚀 Iniciando servidor..."
exec npm start

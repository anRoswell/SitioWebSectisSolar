FROM nginx:stable-alpine

# Copiar archivos estáticos de producción al directorio por defecto de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto de escucha interno
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

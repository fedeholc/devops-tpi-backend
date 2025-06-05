# Backend CI/CD Setup

Este repositorio está configurado con GitHub Actions para automatizar el build, test, y deployment del backend.

## Configuración de Secrets en GitHub

Para que el workflow funcione correctamente, necesitas configurar los siguientes secrets en GitHub:

### 1. Ir a Settings > Secrets and variables > Actions

### 2. Configurar estos Repository Secrets:

| Secret Name          | Descripción                        | Ejemplo                              |
| -------------------- | ---------------------------------- | ------------------------------------ |
| `DOCKERHUB_USERNAME` | Tu nombre de usuario de Docker Hub | `fedeusername`                       |
| `DOCKERHUB_TOKEN`    | Token de acceso de Docker Hub      | `dckr_pat_...`                       |
| `EC2_HOST`           | IP pública o dominio de tu EC2     | `3.85.123.456`                       |
| `EC2_USERNAME`       | Usuario SSH para conectar a EC2    | `ubuntu`                             |
| `EC2_SSH_KEY`        | Clave privada SSH (completa)       | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_PORT`           | Puerto SSH (opcional, default: 22) | `22`                                 |
| `EC2_PROJECT_PATH`   | Ruta absoluta del proyecto en EC2  | `/home/ubuntu/devops-tpi-infra`      |

### 3. Generar Docker Hub Token

1. Ve a [Docker Hub](https://hub.docker.com)
2. Settings > Security > Access Tokens
3. Crea un nuevo token con permisos de **Read, Write, Delete**
4. Copia el token y úsalo como `DOCKERHUB_TOKEN`

### 4. Configurar SSH Key

En tu EC2, asegúrate de que la clave SSH esté configurada correctamente:

```bash
# En tu máquina local, copia la clave pública a EC2
ssh-copy-id ubuntu@tu-ec2-ip

# O manualmente:
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

## Flujo de Trabajo

1. **Push a `main`** → Ejecuta tests
2. **Tests exitosos** → Build de imagen Docker
3. **Build exitoso** → Push a Docker Hub
4. **Push exitoso** → Deploy automático a EC2

## Estructura de Tags

Las imágenes se tagean de la siguiente manera:

- `latest` - Última versión de la rama main
- `main-{sha}` - Versión específica con hash del commit

## Troubleshooting

### Error: "Host key verification failed"

```bash
# En EC2, ejecuta:
ssh-keyscan -H tu-ec2-ip >> ~/.ssh/known_hosts
```

### Error: "Permission denied (publickey)"

- Verifica que la clave SSH esté correctamente configurada
- Asegúrate de que el usuario SSH sea correcto (`ubuntu` para Ubuntu, `ec2-user` para Amazon Linux)

### Error: "docker-compose command not found"

```bash
# En EC2, instala docker-compose:
sudo apt update
sudo apt install docker-compose-plugin
```

### Ver logs del deployment

```bash
# En EC2:
docker-compose logs backend
```

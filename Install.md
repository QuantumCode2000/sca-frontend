  <!-- Install Project -->

# Install Project

## Pasos para instalar el proyecto

1. Clonar el repositorio

```git
git clone https://github.com/QuantumCode2000/sca-frontend.git
```

2. Entrar a la carpeta del proyecto

```bash
cd sca-frontend
```

3. Instalar las dependencias

```bash
npm install
```

6. Iniciar el proyecto

```bash
npm run dev
```

## Posibles errores

- Si al ejecutar el comando `npm install` manda errores de dependencias, ejecutar el siguiente comando

```bash
npm install --force
```

- Si windows manda errores de Policy de ejecución de scripts, ejecutar el siguiente comando

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

- Si al ejecutar el comando `npm run dev` manda errores de dependencias, ejecutar el siguiente comando

```bash
npm run dev --force
```


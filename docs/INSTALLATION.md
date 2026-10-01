# Instalação do `@aurea/ds-core` em projetos consumidores

> Como instalar e conectar o DS-Aurea em um projeto que usa React Native + Expo + Unistyles.

---

## Fases de instalação

### Fase 1 — Desenvolvimento local

Enquanto o `ds-core` ainda está sendo construído, o projeto consumidor aponta diretamente para o repositório local via `file:`.

No `package.json` do projeto consumidor:

```json
{
  "dependencies": {
    "@aurea/ds-core": "file:../ds-aurea/ds-core"
  }
}
```

Depois de adicionar:

```bash
npm install
```

> **Requisito:** os dois repositórios precisam estar no mesmo nível de diretório na máquina de quem desenvolve (`../ds-aurea/ds-core` deve existir).

---

### Fase 2 — Primeiro piloto (GitLab Package Registry)

Quando o `ds-core` tiver sua primeira versão estável (`0.1.0`), ele será publicado no GitLab Package Registry da Aurea.

**Configuração do `.npmrc`** no projeto consumidor (ou na raiz do monorepo do consumidor):

```
@aurea:registry=https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/
//gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/:_authToken=${GITLAB_NPM_TOKEN}
```

Instalação:

```bash
npm install @aurea/ds-core@0.1.0
```

> `PROJECT_ID` é o ID numérico do projeto `ds-aurea` no GitLab. `GITLAB_NPM_TOKEN` deve ser um token com escopo `read_package_registry` — configurado como variável de ambiente local e como CI/CD variable no pipeline do consumidor.

---

### Fase 3 — Uso em produção

Igual à Fase 2. O projeto consumidor passa a instalar versões estáveis via semver:

```bash
npm install @aurea/ds-core@x.x.x
```

---

## Configuração obrigatória do Babel

> ⚠️ **Esta etapa é obrigatória e silenciosa quando esquecida.** Se não for configurada, os estilos do Unistyles simplesmente não vão aplicar — sem erro, sem aviso.

O `@aurea/ds-core` distribui TypeScript fonte (sem passo de compilação). O plugin Babel do Unistyles precisa processar os arquivos do pacote, mas por padrão ignora tudo dentro de `node_modules`.

**No `babel.config.js` do projeto consumidor**, adicionar `@aurea/ds-core` em `autoProcessImports`:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
          autoProcessImports: ['@aurea/ds-core'], // ← obrigatório
        },
      ],
    ],
  };
};
```

Depois de alterar o `babel.config.js`:

```bash
# Limpar o cache do Metro antes de rodar
npx expo start --clear
```

### Como verificar se está funcionando

Após a configuração, importe um componente do DS e confirme que os tokens de cor e espaçamento aplicam corretamente em light e dark mode. Se os estilos parecerem zerados ou ignorados, verifique:

1. Se `autoProcessImports` contém `'@aurea/ds-core'` (string exata).
2. Se o Metro cache foi limpo após a alteração do `babel.config.js`.
3. Se `react-native-unistyles` está configurado como `peerDependency` no `ds-core` — nunca como `dependency` direta, para evitar duas instâncias do Unistyles rodando ao mesmo tempo.

---

## Peer dependencies obrigatórias

O `@aurea/ds-core` declara as seguintes `peerDependencies`. O projeto consumidor já deve tê-las instaladas:

| Pacote | Versão esperada |
|---|---|
| `react` | `^19.2.0` |
| `react-native` | `^0.83.0` |
| `react-native-unistyles` | `^3.1.0` |
| `expo` | `~55.0.0` |

> Instalar qualquer um desses como `dependency` direta no `ds-core` causaria duas instâncias do mesmo pacote rodando simultaneamente, o que quebra o contexto de tema do Unistyles.

`react-native-paper` não é dependência do `ds-core` (AGENTS.md invariante 1). Se o projeto consumidor ainda usa Paper durante a migração, isso é dependência dele, não do DS.

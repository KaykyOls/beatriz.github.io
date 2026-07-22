# Um pequeno pedaço da nossa história

Site estático (HTML, CSS e JavaScript puros) feito para ser acessado por QR Code.

## O que você precisa personalizar

### 1. Fotos
Estão em `assets/images/`. Troque os arquivos abaixo pelas suas fotos reais, **mantendo o mesmo nome de arquivo** (ou ajuste os caminhos em `index.html`):

| Arquivo | Onde aparece |
|---|---|
| `capa.jpg` | Foto de fundo da primeira tela |
| `foto1.jpg` a `foto5.jpg` | Galeria "Nossa História" (polaroids) |
| `foto6.jpg` a `foto8.jpg` | Seção scrapbook |
| `fundo.jpg` | Fundo desfocado da frase em tela cheia |

Recomendado: fotos verticais em boa resolução (mínimo 1200px no lado maior), formato `.jpg`.

### 2. Música (opcional)
Coloque um arquivo `musica.mp3` dentro de `assets/audio/`. O player só toca se o visitante apertar o botão — nunca é automático. Se você não adicionar música, o botão simplesmente não vai funcionar (sem erros visíveis para o visitante).

### 3. Data do contador
No arquivo `js/main.js`, no topo, altere:
```js
const START_DATE = '2022-03-15';
```
para a data que fizer sentido para você (formato `AAAA-MM-DD`). Esse número aparece discretamente no fim da página.

### 4. Textos
Todo o texto está direto no `index.html`, dentro de cada `<section>`, em português claro — fácil de ajustar se quiser mudar alguma palavra.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado).
2. Envie todos os arquivos desta pasta para o repositório (mantendo a estrutura de pastas).
3. Vá em **Settings → Pages**, escolha a branch `main` e a pasta raiz (`/`).
4. Aguarde alguns minutos — o GitHub vai te dar um link como:
   `https://seu-usuario.github.io/nome-do-repositorio/`
5. Gere um QR Code apontando para esse link (qualquer gerador gratuito de QR Code serve) e use no cartão.

## Notas técnicas

- Sem frameworks, sem bibliotecas externas — apenas HTML, CSS e JS.
- Totalmente responsivo, pensado primeiro para celular.
- Animações respeitam `prefers-reduced-motion`.
- Imagens usam `loading="lazy"`.
- As imagens atuais em `assets/images/` são apenas placeholders elegantes gerados automaticamente — troque-as antes de publicar.

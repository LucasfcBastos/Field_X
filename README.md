# Como Executar o Projeto

1. Instalar VSCode:

   ```url
   https://code.visualstudio.com
   ```

2. Instalar do Node.js:

   ```url
   https://nodejs.org/pt/download
   ```

    > Obter a Node.js® [ v20.19.3 (LTS)] para [ Windows ] usando [ Docker ] com [ npm ]

3. Abra o VSCode e, no terminal, clone o repositório:

   ```bash
   git clone https://github.com/LucasfcBastos/Field_X.git
   ```

4. Agora vai até o arquivo .env

   ```bash
   ├── frontend/
   │   ├── node_modules/
   │   ├── public/
   │   ├── src/
   │   ├── .env
   │   ├── .gitignore
   │   ├── eslint.config.js
   ```

5. Encontra a constante VITE_GEMINI_API_KEY e VITE_SUPABASE_ANON_KEY é insira a sua chave

   ```bash
   VITE_SUPABASE_ANON_KEY=
   VITE_GEMINI_API_KEY=
   ```

6. Agora no terminal, navegue até o diretório do projeto:

   ```bash
   cd .\frontend\
   ```

7. Instalar as dependências:

   ```bash
   npm install
   ```

8. Roda o projeto:

   ```bash
   npm run dev
   ```

9. Agora no navegador, na aba do projeto:

   ```url
   http://localhost:5173/
   ```

10. Clica com o botão direito para Inspecionar Elemento
    
11. Alternar a barra de ferramentas do dispositivo para mobile é pronto
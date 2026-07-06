  - name: Setup Node (if using Node) 
    uses: actions/setup-node@v4
    with:
      node-version: "18"

  - name: Install dependencies
    run: npm install

  - name: Build site
    # change this to your project's build command
    run: npm run build

  - name: Upload Pages artifact
    uses: actions/upload-pages-artifact@v1
    with:
      # set this to the folder your build outputs (e.g., ./build, ./public, ./out)
      path: ./build

  - name: Deploy to GitHub Pages
    uses: actions/deploy-pages@v1
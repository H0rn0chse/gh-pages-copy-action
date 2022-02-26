# GithubPages Copy Action

This action copies folders into a target folder.

## Usage

```yaml
    - uses: H0rn0chse/gh-pages-copy-action@main
        with:
          source-json: "./gh-pages-dependencies.json" # default
          target-folder: "./gh-pages" # default
          root: ${{ github.workspace }}
```

### `source-json` parameter
Path to the json containing the folder mappings.
```json
[[
    "/from", "/to"
], [
    "/demo", "/"
], [
    "/dist", "/libs/my-module"
], [
    "/node_modules/some-dependency/dist", "/libs/some-dependency"
]]
```

### `target-folder` parameter
Path to gh-pages folder.

### `root` parameter
Root of the project within the github action used during copy.
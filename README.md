# AutoScore360 / Auto Insight Lab by AutoScore360

Static website for Auto Insight Lab by AutoScore360, published at `autoscore360.com`.

The site provides data-driven Australian ute content, including:

- vehicle review pages
- ute comparison pages
- buyer-fit shortlist pages
- a ute calculator
- a searchable recalls database
- methodology, terms and disclaimer pages

## Local Preview

Because the project is plain HTML/CSS/JavaScript, most pages can be opened directly in a browser. For pages that fetch local files, especially `recalls.html`, use a local static server from the project root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Key Files

- `index.html` - homepage
- `ute-calculator.html` - interactive ute scoring calculator
- `recalls.html` - recall database interface
- `recalls_output.csv` - recall data loaded by `recalls.html`
- `methodology.html` - scoring framework
- `terms-of-use.html` and `disclaimer-copyright.html` - legal/supporting pages

## Update Notes

- Keep canonical URLs aligned with the actual published page paths.
- Update calculator scores and related methodology together.
- Refresh recall data and verify `recalls.html` still loads the CSV through a local server.
- Keep brand naming consistent between AutoScore360 as the domain and Auto Insight Lab by AutoScore360 as the editorial site name.

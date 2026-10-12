# Giorey01 mods

The site that lists my game mods: **https://giorey01.github.io/mods/**

Plain HTML, CSS and JavaScript. No build step: GitHub Pages serves this folder as it is.

## Add a mod

1. Put its pictures in `assets/mods/<id>/` (JPEG, about 1280 px wide; one of them is the cover, 16:10 works best).
2. Add an entry at the top of the list in [`data/mods.js`](data/mods.js). Copy an existing one and change it;
   the comments at the top of the file explain the fields.
3. Commit and push. The home page, the mod's own page, the footer and the counters update by themselves.

The version shown for each mod is read from its latest GitHub release when the page loads; the `version` in
`data/mods.js` is what appears when GitHub cannot be reached.

## Look at it locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Files

```
index.html      home: intro, catalogue, approach, contact
mod.html        one mod: mod.html?m=<id>
404.html        not found
data/mods.js    the catalogue (the only file to edit for a new mod)
js/site.js      renders the pages from the catalogue
css/style.css   the look: ruled grid, mono labels, light and dark
assets/         favicon and each mod's pictures
```

## Licence

[MIT](LICENSE) for the site's code. The screenshots show games that belong to their makers; the mods are
unofficial fan projects.

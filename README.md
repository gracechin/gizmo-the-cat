# Gizmo the Cat

[This random _Gizmo the Cat_ website](https://gizmo-the-cat.netlify.app/) was inspired by a cat called Gizmo, and [_Find the Invisible Cow_](https://berman.xyz/). It was made just for fun.

## To Develop on VS

Open `index.html` with a live server.

## To Deploy

Deployed using [Netlify](https://app.netlify.com/).

## Implementation Notes

- **Background:** `id=canvas` div in `index.html` is used to place Gizmo
- **Gizmo:** Gizmo is placed randomly on the canvas using `index.js`
- **Torch:** `id=mask` div in `index.html` is what makes the screen dark (or coloured black). The torch is styled in `main.css` and it's position is defined by `--pointer-x-percent` and `--pointer-y-percent` CSS variables. `index.js` updates the CSS position variables using mouse/pointer events.
- **Scores:** `class=score` div in `index.html` is for the counting how many times Gizmo is found. `index.js` updates the score.

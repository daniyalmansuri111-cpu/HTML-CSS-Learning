# Roomify 🏠

Roomify is a small interactive interior-design studio made for the browser. It lets you explore room styles, choose furniture, build a simple room layout, change the palette, see an estimated budget, and save your design locally.

## 2. Live Demo

👉 **[Open Roomify Live](https://daniyalmansuri111-cpu.github.io/HTML-CSS-Learning/Roomify/)**

## 1. What is Roomify?

The project is built around the idea of making room planning feel visual and interactive. Instead of only showing furniture cards, Roomify lets you place furniture on a room canvas and immediately see how the design metrics and estimated cost change.

It is a frontend concept, so the saved design is stored in the browser rather than on a server.

## 3. Features

- Responsive interior-design landing page
- Room style explorer
- Minimalist, Japandi, and Modern Office styles
- Furniture catalog
- Furniture category filters
- Interactive room canvas
- Add furniture to the room
- Remove placed furniture
- Undo the most recently added item
- Clear the current room
- Design score
- Color harmony and space balance indicators
- Multiple color palettes
- Live estimated furniture budget
- Save design locally with localStorage
- Before-and-after inspiration section
- Responsive desktop and mobile layout

## 4. Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Remote image URLs
- Browser localStorage
- GitHub Pages

## 5. How it works

Furniture items are defined in JavaScript with their names, categories, prices, images, and display sizes. Selecting a furniture card creates an item on the room canvas.

As furniture is added or removed, Roomify recalculates the item count, estimated budget, design score, color harmony, and space balance.

The current room can be saved locally, so the browser can restore the design when the page is opened again.

## 6. Project Structure

    Roomify/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## 7. Run Locally

Open Roomify/index.html in a browser, or use any simple static web server.

An internet connection is required for the remote furniture and inspiration images.

## 8. Image Sources

The project uses remote images from sources including Unsplash and other publicly hosted image URLs. Check the current license or usage terms of the original source before reusing an image outside this portfolio project.

## 9. Author

**Made by Daniyal Pinjari**

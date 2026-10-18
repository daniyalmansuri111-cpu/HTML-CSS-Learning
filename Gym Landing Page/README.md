# IRONCORE - Gym & Fitness Landing Page

IRONCORE is a modern, responsive gym and fitness landing page built with **HTML5 and CSS3**. The project uses a bold dark design with neon-lime highlights, large typography, trainer profiles, workout programs, membership plans, testimonials, and contact information.

## 🌐 Live Demo

👉 [View Live Website](https://daniyalmansuri111-cpu.github.io/HTML-CSS-Learning/Gym%20Landing%20Page/)

## Preview

The website includes:

- Modern dark gym-themed interface
- Responsive layout for desktop, tablet, and mobile
- Hero section with call-to-action buttons
- Gym features section
- Training programs section
- Three trainer profile cards with individual images
- Membership pricing plans
- Testimonial section
- Contact section
- Footer with social media links
- Hover effects and entrance animation
- Google Fonts integration

## Technologies Used

- HTML5
- CSS3
- Google Fonts
- CSS Grid
- CSS Flexbox
- CSS Media Queries
- CSS Animations
- Responsive Web Design

## Project Structure

```text
IRONCORE/
├── index.html
├── style.css
├── trainer1.jpg.png
├── trainer2.jpg.jpg
└── trainer3.jpg.png
```

## Website Sections

### 1. Hero Section

The landing section introduces IRONCORE with the headline:

> BUILD YOUR STRONGEST SELF.

It includes buttons for starting training and exploring programs, along with gym statistics.

### 2. Why IRONCORE

This section highlights:

- Premium Equipment
- Expert Trainers
- Results Focused

### 3. Training Programs

Four programs are displayed:

- Strength Training
- Cardio Blast
- Functional Fitness
- Weight Loss

### 4. Expert Trainers

The website contains three trainer profiles:

- Ayan Tamboli - Strength Coach
- Sufiyan Shaikh - Fitness Coach
- Abuzar Siddiqui - Performance Coach

Each trainer has an individual profile image and hover effect.

### 5. Membership Plans

Three membership plans are available:

| Plan | Price |
|---|---:|
| Basic | ₹999/month |
| Pro | ₹1,999/month |
| Elite | ₹2,999/month |

The Pro plan is highlighted as the most popular option.

### 6. Testimonial

A motivational testimonial section is included to make the website feel more realistic and engaging.

### 7. Contact Section

The contact area contains:

- Location
- Phone number
- Email
- Join IRONCORE button

### 8. Footer

The footer contains the IRONCORE logo, copyright information, and social media links.

## 🖼️ Trainer Images

The trainer images are stored in the project folder and connected through CSS:

```css
.trainer-one {
    background-image: url("trainer1.jpg.png");
}

.trainer-two {
    background-image: url("trainer2.jpg.jpg");
}

.trainer-three {
    background-image: url("trainer3.jpg.png");
}
```

Keep the image filenames exactly the same unless you also update the CSS.

## 📱 Responsive Design

The website adapts to different screen sizes using CSS media queries.

- **Desktop:** Multi-column layouts for features, programs, trainers, and pricing.
- **Tablet:** Navigation and content layouts adjust for smaller screens.
- **Mobile:** Single-column layouts and reduced spacing help improve usability.

## ▶️ How to Run

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Make sure `index.html`, `style.css`, and all three trainer images are in the correct folder.
4. Open `index.html` in your browser.

For the best development experience, use the **Live Server** extension in VS Code.

## 🎯 Learning Goals

This project demonstrates practical use of semantic HTML, CSS Grid and Flexbox, responsive layouts, background images, hover effects, CSS animations, typography, navigation links, pricing cards, and mobile-first adjustments.

## 🔮 Future Improvements

Possible future upgrades include a JavaScript navigation menu, working membership registration, a contact form, login and signup, workout and BMI calculators, trainer booking, payment integration, and a backend database.

## Author

Daniyal Pinjari

Created as part of a daily web development project series.

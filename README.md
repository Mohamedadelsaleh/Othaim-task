# Othaim-task

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://othaim-task.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Test Coverage](https://img.shields.io/badge/coverage-85%25-green)](https://github.com/Mohamedadelsaleh/Othaim-task)

## Table of contents
* [Live Demo](#live-demo)
* [App Structure](#app-structure)
* [Setup](#setup)
* [OpenSourse](#opensourse)
* [Pictures](#pictures)
* [Authors](#authors)
* [Built With](#built-with)
***

## Live Demo

[Othaim-Ecommerce-App-Link](https://othaim-task.vercel.app/)


## App-structure
Othaim Ecommerce is a modern ecommerce application built with Next.js, TypeScript, and React Context API.
src/
├── pages/ # Next.js page routes
│ ├── cart/
│ ├── order-confirmation/
│ └── ...
├── components/ # Reusable components
│ ├── Cart/
│ ├── ProductCard/
│ └── ...
├── context/ # Global state management
│ └── CartContext.tsx
├── services/ # API services
│ └── services.ts
├── styles/ # Global styles

## Setup

### Prerequisites
- Node.js v18+
- npm v9+

Install the main source of the project :

1. Clone the repository:
```bash
git clone https://github.com/Mohamedadelsaleh/Othaim-task.git
cd Othaim-task
```

2. After downloading project files open them in your IDE then in open Terminal and Install dependencies:

```bash
npm install 
```

3. Start development server:

```bash
npm run dev 
```


## OpenSourse

  It's an open-source project You can edit on it and develop what you want.

  Architecture Decisions

    State Management:
    Chose React Context API over Redux for simpler cart management needs

    Styling:
    Used SCSS modules for component-scoped styles and maintainability
    
    Offline Support:
    LocalStorage caching for cart persistence and product data

## Pictures

![FireShot Capture 007 - Othaim Ecommerce app - othaim-task vercel app](https://github.com/user-attachments/assets/d3f1548c-0f0c-4a25-8d18-52cdf053f16c)
![FireShot Capture 008 -  - othaim-task vercel app](https://github.com/user-attachments/assets/5114e116-e21d-45fb-b873-d41b63ebc93e)
![FireShot Capture 009 -  - othaim-task vercel app](https://github.com/user-attachments/assets/df08b22e-5f95-49c2-b361-f7aa1cfa2624)


## Authors
* [Mohamed Adel Salah Gouda](https://github.com/Mohamedadelsaleh)

## Built-with
* Nextjs
* TypeScript
* React Context API

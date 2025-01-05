# Employee Management Software - Frontend Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Authentication](#authentication)
4. [API Integration](#api-integration)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)

---

## Overview

The frontend of the **Employee Management Software** is built using **Angular 14**, **HTML5**, **CSS3**, and **Bootstrap** for responsive and user-friendly design. The frontend communicates with the backend via RESTful APIs to manage employee data, authentication, and other features.

### Key Features:
- **Responsive Design**: Built using **Bootstrap** to ensure the UI is mobile-first and responsive.
- **SPA (Single Page Application)**: The application is built as a single-page app using Angular, ensuring fast, dynamic user interactions.
- **Component-Based Architecture**: Angular's component-based architecture is used to modularize the frontend, making it maintainable and scalable.
- **API Integration**: The frontend integrates with the backend API to perform operations like login, employee management, and department management.
- **JWT Token Authentication**: JWT is used for secure authentication, ensuring that only authenticated users can access certain pages and features.

---

## Technologies Used

The project utilizes the following technologies:

- **Angular 14**: Framework for building the frontend of the application.
- **HTML5**: For structuring the web pages.
- **CSS3**: For styling and responsive design.
- **Bootstrap**: For responsive, mobile-first design and UI components.
- **JWT (JSON Web Token)**: For handling secure authentication and authorization.
- **RxJS**: For reactive programming and handling asynchronous operations like HTTP requests.

---

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install [from Node.js official website](https://nodejs.org/).
- **Angular CLI**: Install Angular CLI globally using the following command:
  ```bash
  npm install -g @angular/cli

# Lilith's Latte Labyrinth

## Project Aesthetic: Victorian Gothic Inspiration

The project incorporates a visually captivating Victorian Gothic aesthetic, featuring dark tones with neutral undertones. This aesthetic creates an intriguing and mysterious ambiance, giving Lilith's Latte Labyrinth a unique and captivating atmosphere.

## Project Objective

The main objective of Lilith's Latte Labyrinth is to provide users with a platform to discover hidden gems among local coffee shops, offering an alternative to popular chains such as Starbucks, Coffee Bean, or Dunkin Donuts. The project aims to cater to individuals seeking the charm and authenticity of locally-owned and operated cafes. The vision is to create an entertaining application that combines a spooky twist with a touch of classic elegance.

## Technical Tools Utilized for Presentation

For the development of this 3-tier web application, the following technical tools were employed:

### 1) Presentation Tier - Frontend (React)

The frontend layer was built using React with TypeScript, fulfilling the following responsibilities:

- Creation of an intuitive and visually appealing user interface (UI).
- Rendering HTML, CSS, and TypeScript components to deliver a seamless user experience.
- Rendering & Generating utilization of Vite "veet".
- Implementation of input validation for data integrity.
- Communication with the backend (Flask) to fetch and update data.

To start the app, run
`sudo sh deploy.sh`

### 2) Application Layer - Backend (Flask with Python Framework)

The backend layer was developed using Flask, a Python web framework, to accomplish the following tasks:

- Management of application logic and functionality.
- Provision of APIs (Application Programming Interfaces) for seamless interaction with the frontend.
- Handling of incoming HTTP requests from the frontend and delivering appropriate responses.
- Integration of SQLAlchemy, an Object-Relational Mapping (ORM) tool, to facilitate smooth interaction with the SQL database (PostgreSQL).

To start the backend, follow the following steps below:

1. Open your terminal and navigate to the project root directory.
2. Run the following command to start the application:
   ```
   sh deploy.sh
   ```
   This will execute the `deploy.sh` script, which performs the following actions:
   - Removes the `dist` directory if it exists.
   - Navigates to the client directory.
   - Runs the frontend build process using the `npm run build` command.
   - Navigates back to the project root directory.
   - Starts the Flask server using the `flask run` command.

By leveraging this technical stack, _Lilith's Latte Labyrinth_ ensures a captivating user experience, seamlessly integrating frontend presentation, backend logic, and secure data storage through a PostgreSQL database.

### 3) Data Layer - SQL Database

The database utilizes a PostgreSQL database to store and manage application data. The following tools were utilized:

PostgreSQL, in conjunction with Render, was employed for initial database creation and management.
SQLAlchemy, a Python library, was utilized to interface with the database, facilitating efficient data retrieval, manipulation, and storage.
By leveraging this technical stack, Lilith's Latte Labyrinth ensures a captivating user experience, seamlessly integrating frontend presentation, backend logic, and secure data storage through a SQL database.

## Future Enhancements

In the future, the project plans to add the following features:

- Integration of a place search API to locate coffee shops.
- Addition of Yelp reviews for each location.
- Implementation of clickable details for each location using the FourSquare API.

While working with the FourSquare API, it was observed that when providing a location or city, the API is able to return results local to the user. This functionality is believed to be based on a lookup of the user's current IP address. Further investigation is required to understand how this determination is made with the API's current functionality.

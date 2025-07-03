# Hampi Yura - E-commerce Website for Medicinal Plants and Body Care

![Homepage Preview](/public/images/localhost_3000_.png)
_Preview of the Hampi Yura homepage_

## About

Hampi Yura is an e-commerce platform focused on providing natural and organic medicinal plants and body care products. This application serves as a digital marketplace for those seeking authentic and natural treatments, inspired by ancient traditions and natural wisdom.

## Features

- Showcases various medicinal plant products
- Offers natural body care products
- User-friendly interface with EJS template engine
- Utilizes PostgreSQL for database management
- Session management with express-session
- Secure cookie handling using cookie-parser
- Sophisticated HTTP requests with method-override and CORS

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/hampi-yura.git
   cd hampi-yura
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your PostgreSQL connection string:
     ```
     DATABASE_URL=your_database_url
     ```
4. **Run the server:**
   ```sh
   npm start
   ```
   The server will be running on [http://localhost:3000](http://localhost:3000).

## Usage

- Access the main page at `/`
- Explore products under `/products`
- User account management available at `/user`

## Error Handling

- Custom 404 not-found page when a route does not exist.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Template Engine:** EJS
- **Styles:** Static CSS

## Contributing

We welcome contributions! Please feel free to submit pull requests or open issues to improve the project.

## License

This project is for educational purposes only.

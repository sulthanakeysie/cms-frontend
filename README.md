
Customer Management System created using React 
The Customer Management System (CMS) is a web application designed to manage customer information. It provides features such as user authentication, customer CRUD (Create, Read, Update, Delete) operations, and data validation

Project Structure
  - React.js: Library for building the user interface.
  - MUI (Material-UI): React component library for styling.
  - Formik: Library for form management and validation.
  - Yup: Schema builder for value parsing and validation.

    
Environment Setup
  1. Clone frontend repository:
     - git clone https://github.com/sulthanakeysie/cms-frontend.git
  
  2. Install Dependencies:
     - cd cms-frontend
     - npm install

  3. Configuration:
     - Create a `.env` file for environment variables

  4. Run:
      - npm start

 Functionality

   Authentication
    - Login: Validates user credentials and returns a JWT token on successful authentication.
    - Protected Routes: Secure API endpoints using JWT to ensure only authenticated users can access them.

  Customer Management
    - Create Customer: Add a new customer to the database.
    - Read Customer: Retrieve customer information from the database.
    - Update Customer: Modify existing customer information.
    - Delete Customer: Remove a customer from the database.

Form Validation
    - Formik and Yup: Used for managing form state and validation schema to ensure data integrity.


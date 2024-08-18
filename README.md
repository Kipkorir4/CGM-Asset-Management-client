# CGM Properties Asset Management

## Overview

CGM Properties Asset Management is a web application designed to streamline the management of property-related issues within the CGM Properties organization. The application facilitates the process of filing, reviewing, and managing complaints, with specific roles and responsibilities assigned to different users.

## Users and Roles

- **CEO**
  - The main administrator of the platform.
  - Can view all users and their roles.
  - Can see all accepted and declined complaints along with their respective allocated amounts.
  - Responsible for enrolling/registering new users to the platform.

- **Procurement Manager**
  - Receives complaints/issues filed by tenants.
  - Decides whether to accept or decline each complaint.
  - If accepted, the complaint is forwarded to the Finance Manager.

- **Finance Manager**
  - Reviews accepted complaints.
  - Allocates funds to complaints based on the category budget and available balance.
  - Ensures proper financial management of property-related issues.

- **Tenant**
  - Reports issues/files complaints related to their property.
  - Selects the category of the issue/complaint.
  - Provides a brief description of the issue.
  - Can upload a picture related to the complaint.

## Features

- **Complaint Filing:** Tenants can file complaints by selecting a category, writing a description, and uploading an image.
- **Complaint Review:** Procurement Managers can review complaints and decide to accept or decline them.
- **Budget Management:** Finance Managers can allocate funds to accepted complaints, ensuring the budget is adhered to.
- **User Management:** The CEO can manage user roles, register new users, and oversee the entire complaint management process.

## Technology Stack

- **Frontend:**
  - Framework: [React](https://reactjs.org/)
  - Build Tool: [Vite](https://vitejs.dev/)

- **Backend:**
  - Framework: [Flask](https://flask.palletsprojects.com/)
  - Database: [PostgreSQL](https://www.postgresql.org/)

## Installation
No need to install. Access the web app at: https://cgm-properties.vercel.app/  



## To Contribute or test out the Project:
### Prerequisites

- Node.js and npm/yarn installed.
- Python and pip installed.
- PostgreSQL installed and running.

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:Kipkorir4/CGM-Asset-Management-client.git
   cd CGM-Asset-Management-client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:Kipkorir4/CGM-Asset-Management-server.git
   cd CGM-Asset-Management-server
   ```

2. Create a virtual environment and activate it:
   ```bash
   pipenv shell
         or
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pipenv install
   ```

4. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   - Configure the database connection in your Flask app's config.

5. Apply database migrations:
   ```bash
   flask db upgrade
   ```

6. Run the development server:
   ```bash
   flask run
   ```

## Deployment

- **Frontend:** The frontend can be deployed using services like Vercel, Netlify, or any static hosting provider.
- **Backend:** The backend can be deployed on platforms like Heroku, AWS, or any cloud service that supports Flask applications.

## Accessing the Application

Once deployed, the application can be accessed via the deployed link provided by your hosting provider.






## License

This project is licensed under the CGM Properties License.

---

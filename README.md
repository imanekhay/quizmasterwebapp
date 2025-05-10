# QuizMaster

QuizMaster is a full-stack quiz application built with [SvelteKit](https://kit.svelte.dev/), MySQL, and Node.js.  
It features user authentication, quiz categories, score tracking, and a modern responsive UI.

---

## Features

- User registration and login (with age restriction)
- Secure password hashing using **bcrypt** (external Node.js module)
- Quiz categories (Math, Science, Music, etc.)
- Dynamic quiz fetching from [Open Trivia DB](https://opentdb.com/)
- Score calculation and review
- Responsive design with reusable Svelte components (Navbar, Footer, Profile, SearchBar, etc.)
- MySQL database integration

---

## External Node.js Modules Used

- [`bcrypt`](https://www.npmjs.com/package/bcrypt): For secure password hashing and verification
- [`mysql2`](https://www.npmjs.com/package/mysql2): For connecting to the MySQL database
- [`feather-icons`](https://www.npmjs.com/package/feather-icons): For SVG icons in the UI

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MySQL database (see `.env` for connection details)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/quizmaster.git
   cd quizmaster
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Edit the `.env` file with your MySQL credentials.

4. **Set up the database:**

   - Ensure your MySQL server is running and the `quizmaster` database exists.
   - Create the `users` table:
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       dob DATE NOT NULL
     );
     ```

5. **Run the development server:**

   ```sh
   npm run dev
   ```

6. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
  lib/
    components/
      Navbar.svelte
      Footer.svelte
      Profile.svelte
      SearchBar.svelte
      LogoutButton.svelte
      Login/
        LoginPage.svelte
        Login.ts
      Register/
        RegisterPage.svelte
        Register.ts
    database.ts
  routes/
    dashboard/+page.svelte
    login/+page.svelte
    register/+page.svelte
    profile/+page.svelte
    quiz/[slug]/+page.svelte
    api/
      auth/
        login/+server.ts
        signup/+server.ts
.env
```

---

## How It Works

- **Authentication:**  
  Users register and log in. Passwords are hashed with `bcrypt` before storing in MySQL.

- **Quiz Flow:**  
  Users select a category, answer questions fetched from Open Trivia DB, and see their score at the end.

- **Components:**  
  The UI is built from modular Svelte components for maintainability and reusability.

---

## Customization

- Add more quiz categories by editing the `categories` array in `dashboard/+page.svelte`.
- Customize the UI by editing Svelte components in `src/lib/components/`.
- Extend user profiles or add features like leaderboards as needed.

---

## License

MIT

---

## Credits

- [SvelteKit](https://kit.svelte.dev/)
- [Open Trivia DB](https://opentdb.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [feather-icons](https://feathericons.com/)

---

Enjoy using QuizMaster!

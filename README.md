# Food Ordering App (React.js)

A very simple food ordering application built using ReactJS. Contains features like **listing all available food items** from the a database, **adding food items to a cart** and **placing an order** back to the database. *Firebase* was used as my test database to create this app.

## Steps to run the application:

**1.  In the project directory, run this command in your respective terminal to install all required node modules:**
```bash
npm install
```

**2. Add your firebase realtime database url in the following files. The standard URL format: <Database_URL>/json_file_name.json**
- src/components/Cart/Cart.js @ Line 50.
- src/components/Meals/AvailableMeals.js @ Line 34

The format of the food items is shown below:

![food-items-format](demo_imgs/food-items.png)

**3. Finally, run this command to start the react app:**
```
npm start
```

## Snapshots:

![home-page](demo_imgs/home-page.png)

![cart](demo_imgs/cart.png)

**Important Note:** This application was built as a code-along with <a href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/" target="_blank">this course</a> on Udemy. This project, though simple, helped me understand some of the newer and more advanced features of ReactJS.
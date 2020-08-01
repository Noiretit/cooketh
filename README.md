![cook](https://media.giphy.com/media/LVBH3rg1BUROw/giphy.gif)

# cooketh

<br>

## Description

Lazy to cook? Got a last-minute dinner at home and you are out of ideas? This website gathers a community of nearby cooks to cook for you anyday, anytime, any cooking style.

Find a recipe you like, select your zone, a day, and hour, number of guests to please and send a request to the cook.
Once accepted, just wait for the day, relax and let the cook do the work.

Or sign-up as a cook and offer your awesome skills to the rest of the world: upload your specialties, take some neat pictures of your dishes (and you), fill up your profile and get ready to make some coins and friends.

Everybody wins.

<br>

## User Stories

- **404** 
  - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** 
  - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** 
  - As a user I want to be able to access the homepage and look for recipes, also to have a navbar with a home button, sign up, log in and a FAQ page.
    Once logged in, I want to see my profile, my bookings and log out in the nabber.
- **sign up** 
  - As a user I want to sign up on the web page so I can look for recipes, see the chefs, make bookings, edit them and save recipes for future occasions.
  - As a cook I want to sign up on the web page so I can add my recipes, upload pictures and accept requests.
- **login** 
  - As a user and a chef I want to be able to log in on the web page so that I can get back to my account.
- **logout** 
  - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **recipes list** 
  - As a user I want to see the list of recipes and filter them by style of cooking, type of cooking (vegan, vegetarian, all), allergies and price.
- **specific recipe** 
  - As a user I want to see a more detailed view of the recipe with more pictures, description, ingredients, a form request to the chef and details of the chef.
- **my (user) profile** 
  - As a user I want to be able to edit my profile.
- **my (chef) profile** 
  - As a chef I want to be able to edit my profile and see my recipes.
- **my recipes**
  - As a chef I want to be able to create, edit and delete my recipes.
- **my bookings** 
  - As a user I want to see accepted bookings and be able to delete my pending requests.
  - As a chef I wan to see my accepted bookings or delete my pending requests.
- **FAQ** 
  - As a user and as a chef I want to see the most frequented asked questions about this website.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                   | **Description**                                              | Request - Body                                               |
| ---------- | --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| --------   | ----routes/auth.js----      | --------                                                     | --------                                                     |
| `GET`      | `/login`                    | Renders `login` form view.                                   |                                                              |
| `POST`     | `/login`                    | Sends Login form data to the server. Redirects both users and chefs to the home page. | { email, password, isAChef: true/false}                      |
| `GET`      | `/signup-user`              | Renders `signup` USER form view.                             |                                                              |
| `POST`     | `/signup-user`              | Sends sign-up USER info to the server and creates user in the DB.<br />Redirects the user to the home page (automatic login). | { name, email, phone-number, address, age, diet, allergies, password }<br />{<u>not mandatory</u>: description, profile picture, social media} |
| `GET`      | `/signup-chef`              | Renders `signup` CHEF form view.                             |                                                              |
| `POST`     | `/signup-chef`              | Sends sign-up USER info to the server and creates user in the DB.<br />Redirects the chef to the home page (automatic login). | { name, email, phone-number, address, age, main-specialty, working-days, password, description }<br />{<u>not mandatory</u>: profile picture, social media} |
| `GET`      | `/logout`                   |                                                              |                                                              |
| --------   | ----routes/index.js----     | --------                                                     | --------                                                     |
| `GET`      | `/`                         | Main page route. Renders index view                          |                                                              |
| `GET`      | `/faqs`                     | Renders FAQ view                                             |                                                              |
| --------   | ----routes/recipes.js----   | --------                                                     | --------                                                     |
| `GET`      | `/recipes`                  | Renders list of all recipes view                             |                                                              |
| `GET`      | `/recipes/:id`              | Renders the selected recipe view                             |                                                              |
|            | MIDDLEWARE ACCESS           |                                                              |                                                              |
| `GET`      | `/recipes/new`              | Renders the create recipe form                               |                                                              |
| `POST`     | `/recipes/new`              | Sends created recipe form data to the server.<br />Redirects to chef recipes' view with a success/error message. | {title, type of food, diet, allergies, serves X PAX, price/serving, ingredients, description, pictures} |
| `GET`      | `/recipes/:id/edit`         | Renders the edit recipe view                                 |                                                              |
| `POST`     | `/recipes/:id/edit`         | Send edit recipe info to server and updates the recipe in DB.<br />Redirects to chef recipes' view with a success/error message. | {title, type of food, diet, allergies, serves X PAX, price/serving, ingredients, description, pictures} |
| `GET`      | `recipes/:id/delete`        | **Deletes** selected recipe (only if user created it).<br />Re-renders chef profile view with a success/error message. |                                                              |
| --------   | ---routes/bookings.js---    | --------                                                     | --------                                                     |
| `POST`     | `/bookings/new`             | Send the created event form data to the server (from /recipe:id form).<br />Redirects to user bookings view to see pending & accepted requests. | {data, time, address, number of dishes}                      |
| `GET`      | `/bookings/:id/decline`     | **Deletes** a **PENDING** booking from DB. <br />Re-renders same page (`profile-chef OR user/:id/bookings`) with a success/error message. |                                                              |
| `GET`      | `/bookings/:id/accept`      | **Accepts** a **PENDING** booking from DB<br />Re-renders same page (`profile-chef OR user/:id/bookings`) with a success/error message. |                                                              |
| --------   | ---routes/user.js---        | --------                                                     | --------                                                     |
| `GET`      | `profile-user/:id/edit`     | Renders edit user profile view                               |                                                              |
| `POST`     | `profile-user/:id/edit`     | Sends edit-profile info to server and updates user in DB.<br />Redirects to user profile view with a success/error message | { name, email, phone-number, address, age, diet, allergies, password, description, profile picture, social media} |
| `GET`      | `profile-user/:id`          | Renders user profile view                                    |                                                              |
| `GET`      | `profile-user/:id/bookings` | Renders user's bookings (pending & accepted) view            |                                                              |
| --------   | ----routes/chef.js----      | --------                                                     | --------                                                     |
| `GET`      | `profile-chef/:id/edit`     | Renders edit chef profile view                               |                                                              |
| `POST`     | `profile-chef/:id/edit`     | Sends edit-profile info to server and updates user in DB.<br />Redirects to chef profile view with a success/error message | { name, email, phone-number, address, age, main-specialty, working-days, password, description, profile picture, social media} |
| `GET`      | `profile-chef/:id`          | Renders chef profile view                                    |                                                              |
| `GET`      | `profile-chef/:id/bookings` | Renders chef's bookings (pending & accepted) view            |                                                              |

## Models

User model

```javascript
{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    diet: { type: String, required: true },
    allergies: [{ type: String, required: true }],
    password: { type: String, required: true },
    picture: String,
    description: String,
    facebook: String,
    instagram: String,
    twitter: String,
    bookings: [ { type: Schema.Types.ObjectId, ref: 'Booking' } ],
},
{
    timestamps: true
}
```

Chef model

```javascript
{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    mainCookSpecialty: { type: String, required: true },
    workingDays: [{ type: String, required: true }],
    password: { type: String, required: true },
    description: { type: String, required: true },
    picture: String,
    facebook: String,
    instagram: String,
    twitter: String,
    recipes: [ { type: Schema.Types.ObjectId, ref: 'Recipe' }],
    bookings: [ { type: Schema.Types.ObjectId, ref: 'Booking' } ],
},
{
    timestamps: true
}
```

Recipe model

```javascript
{
    title: { type: String, required: true },
    typeOfFood: { type: String, required: true },
    diet: { type: String, required: true },
    allergies: [{ type: String, required: true }],
    serves: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: true },
    description: { type: String, required: true },
    pictures: { type: String, required: true },
    chef: { type: Schema.Types.ObjectId, ref: 'Chef'}
},
{
    timestamps: true
}
```

Booking model

```javascript
{
    dateAndHour: { type: String, required: true },
    address: { type: String, required: true },
    numberOfDishes: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted' ], default: 'pending'},
    chef: { type: Schema.Types.ObjectId, ref: 'Chef'},
    customer: { type: Schema.Types.ObjectId, ref: 'User'},
    recipe: [ { type: Schema.Types.ObjectId, ref: 'Recipe' } ]
},
{
    timestamps: true
}
```

<br>

## Backlog

[See the cooketh Trello board](https://trello.com/b/Y5GMYe0T/m2-cooketh-jb-serge)

<br>

## Links

### Git

[Github repository](https://github.com/OnizukaJS/Cooketh/tree/master)

[Deploy Link]() (missing)

### Userflow

[Miro user flow](https://miro.com/app/board/o9J_koKWL38=/)

### Wireframes

[Balsamiq wireframes](https://drive.google.com/file/d/1Qsk09SaDFueiylDch3HKCGvD-RZ33abU/view?usp=sharing)

### Slides

[cooketh Google slides](https://docs.google.com/presentation/d/1dx2S04QgKN3ZaoDMJTh3-Nomuq5VjSl0ITodbFh44lc/edit?usp=sharing)

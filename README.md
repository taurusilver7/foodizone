# FoodiZone

> An online food-ordering application powered by react-js and CSS.

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Build

Refactor the template to suit the project. Remove unnecessary stylesheets and scripting files.\
Replace the default files with suitable project docs. [title icon](https://www.favicon.cc/?action=icon&file_id=951529)\

Create three folders in components directory to hold different component for the project.\
 UI folder for general UI elements, Layout for Header & related elements, Meals and Cart folders for corresponding components & elements.

The header component has header title, the cart button (reusable component). The cartIcon is a svg format file function.\

The Meal directory has a MealSummary with hard-coded text, AvailableMeals with an array of meal-list. The Meal component is the combination of the above two. The data mapped in the Meal component is separated into another wrapper component to provide html structure & css content??? `Card`\

For induvidual meal items, a customized mealItem compoenent is created with mealForm for markup form.
Another component `Input` for form input field. The Input component is a reusable one in UI directory

A Cart component to display items in the cart and implement cart functions. The cart is a modal displayed on the main page. The modal is mounted above the `root` div in the index.html file and the ReactDOM creates a protal for Backdrom and ModalOverlay components.\
The newly creataed portals needs the location to portal (the overlay div above root in index.html) as an argument with what to portal.\

Create a state to manage the cart modal in parent component `App`. Control the state from Header component cart button. Point the showcartHandler funtion to the Header component to execute upon cart-click.\
 The modal close fn should also work when the backdrop is closed. Add the hideCartHandler function to the Backdrop in Modal and add the functionality to Modal in cart. The close button and the backdrop executes the hideCartHandler function in App.

### Cart Context

Instead of managing the states from parent component, set up the context to manage the states. Create the context files in /src/store directory.\
The context and the provider for the states are created. All the components in the App component needs the state props, to rerender the application. Wrap the App with CartProvider to wrap all the components.

By using the useContext(CartContext) hook, the HeaderButton component will be re-evaluated by react whenever the context changes (update in CartProvider). Change the cart value to dynamic.
useReducer to manage the state in CartProvider to add an item to the cart.

Set a state to check the amount validity with a condition and add the item to the cart number in MealItemForm component. Add a forwardRef to the Input component to link the amountRef to the entered cart-item amount.

Create another context in MealItem to execute addItem to the addCartHandler function. With this, the cart number represents the added items.

Now, to update the items & order values in cart, create another context in Cart and replace the dummy array with the items in the context. Create functions to derieve the totalAmount, cart items.

Create a CartItem component to display the order details in the cart modal. Work on complex reducer logic to organize the items in the cart.\
Check for the preexistence of items in the cart before adding a new item. If found, update the item-count & totalAmount. Extend the logic to the add/minus buttons in the cart modal.

### Backend.

- Create a firebase account to link the Realtime database to the App. Create a realtime database and fill in the database with the meal data in NoSQL structure.
- Use the https fetch method and useEffect to render the sideeffects in AvailableMeals. Delete the dummy data. Send the https req to the database node.
  \*\* Don't forget to add an extention of /meals.json to the https req node.
- Once the responseData is parsed and the data is pushed into an array, the component is rerendered with the data once the fetching is complete. Since the fetching is an async task and loaded after the components are rendered for the first time, initially there would be no data.
- Now the data is changeable and the component should be reevaluated once the data changes, a state is required to avoid discrepencies and bugs.
- Load the array into the setMeals fn, and map through meals state to render the component. The promise sometimes might take some time to load the data, so a loading state for better UI is initiated.
- An error state for https error messages is initiated. A toast could also be used as an alternative for issuing error and loading messages.

A Checkout component below the Cart modal to enter the user details for delivary. The order function to handle the checkout form.

- The modal is refactored to display only cart-items until checkout initiation, and then the checkout modal below the cart with form handling.

### Form submission

A useRef() hook to get the inputs are entered. Gather the entered data from ref and create an object to validate and push forward.\
Check if the values are empty and postal code is exactly five number (chars) with handler functions.\
Gather the user data from the form, but uplift the data to Cart component, to get the order data and forward them to the database.\

- On the server, a developer shouldn't blindly trust the user data, as the validation could always be circumvented. The data on the server should always be validated.

- Send a fetch req (POST method) to send the order & user data to the database. To add better UI, clear the form with a confirm message.
- Add a method in CartProvider to clear out the cart after a successful order sequence. The method clearCart dispatches an action 'CLEAR', upon which the state the returned to its default state.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

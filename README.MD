# WORKERBASE Web Assessment

Hi, welcome to the **WORKER**BASE coding challenge.

- You should not invest more than 2 hours in this test. You can split your progresses into multiple commits. Please stop and commit your changes after that time.
- Please create a markdown file for each of the tests and upload the results to GitHub.
- TEST 1 - 3 shouldn't take you longer than 30 minutes.
- TEST 4 will probably take you longer than 90 minutes. It's no problem if you can't finish, just try to be as fast as possible.

## TEST 1 - General Knowledge

1. What tools can be used to ensure consistent style? Why is it important? Which tools did you use before, which one do you prefer and why?
    - ESLint and Beautify. Eslint for checking the code style readability. and beautify to auto format code in vscode for example
    - It's important for two reasons: 1) it enhances the code readbility as ESlint rules are well defined and make the code look much cleaner so more readable. 2) it make the merge conflicts less by making the style for the code unified in terms of new lines, spacings, etc.
    - I used both Eslint and beautify before.
    - No preferring here as they both don't do the same job.

2. According to you, what are the characteristics of a good Continuous Integration pipeline?

    - It should check for linting, 
    - It should check that the code builds normally with no errors or warnings.
    - It should check by running unit tests, and integration tests to make sure new changes isn't breaking anything 
    - It should be running fast not a really long pipeline to wait for to verify some results.

3. Would you go for 80% Unit tests and 20% E2E tests or 20% Unit tests and 80% E2E tests? Why? What kind of tests can you also add?
    
    - I would go for 80% unit tests and 20% E2E as the unit tests tend to be faster in execution and cover individual components as a seperate entity so testing extensively on that first would cover more. Then the 20% E2E to test the scenario in the real production environment.
    - Other types of tests could be functional tests and performance tests

4. How would you test your frontend (let's say, a React application) ?

    - If using redux, or server side rendering (SSR) to store local state data for the application. We can add a mock for the api that run when the unit tests start running and then these unit tests react with the mock api and make sure that the data is stored correctly in the local state.
    - Applying graphical tests where necessary (but usually graphical tests are hard to implement so just when necessary).

5. How do you ensure you and your team write high quality and clean code?
    - Use enhancing code redeability tools like eslint
    - Define app architecture, practices, code structure precisely (how the code is structured, where everything is placed, what's the practices we are using in defining constants, theme variables, etc.)
    - Good merge request reviews.
6. What's your favourite tech stack and why?
    - I am not sure if tech stack here means technologies inside the stack of some field or fields. but let me answer both.
    - My favourite field is mobile apps development as with such a small device with small specs you can do alot.
    - My favourite stack inside mobiles apps development is Swift (iOS) and in the full stack is (MongoDB, Express & Node, React)
7. What's your least favourite tech stack and why?
    - like above i am not sure.
    - so in mobile least favourite tech stack is android (Java)
    - and in full stack in backend my least favourite is plain php and in frontend Angular.
8. Can you access DOM in Node?
    - I am not sure if it's feasbile or not as i don't get the question much
9. How would you design an event driven system? How the communication between the parts would look? How the resource access would look?
    - We would need to define consumers and producers for handling the events.
    - So producers would be producing events based on some actions, state changes, depending on what's the system we are implementing. And for the example these events would be saved in some shared instance of a datastrucure e.g:queue (like messaging queues) that's accessible by the consumers.
    - Consumers access events in the queue and handle them accordingly and put the response back for the producer to pick up and provide the feedback for the user.
    - Shared access can be managed by doing a scheduling algorithm between different threads of consumers to access the messaging queues and any shared resource like database for example.

## TEST 2 - Asynchronous code

What's wrong with this code snippet?

```javascript
new Promise((resolve, reject) => {
  throw new Error("error");
}).then(console.log);
```
- despite the console.log that's not corrent if we don't count that
- this promise just throws an error so whenever it's fulfilled it just throws an error doesn't pass this error for the reject function for example

How would you change the code bellow to get the value of the promises that passed as well as the failed promises?

```javascript
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3),
  Promise.resolve(4)
])
  .then(results => console.log(reuslts))
  .catch((err, data) => console.error(err, data));
```

i would change it like the following:

```javascript
const y = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3).catch(e => e),
  Promise.resolve(4)
])
  .then(results => console.log(results))
  .catch((err, data) => console.error(err, data));
```

Change ONLY the code on function run to not use a callback but a promise, consider that the code will run on Node

```javascript
function asyncSum(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 100);
}
function run() {
  asyncSum(1, 2, result => {
    console.log("The sum of 1 and 2 is " + result);
  });
}
```

i would change to the following:

```javascript
function asyncSum(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 100);
}
function run() {
    return new Promise((resolve, reject) => {
        asyncSum(1, 2, resolve)
    }).then(res => {
        console.log("The sum of 1 and 2 is " + res);
    })
}
run();
```

## TEST 3 - JS CODING STYLES

```javascript
const Lengths = {
  lengthShort: 0,
  lengthMedium: 5,
  lengthLarge: 10
};

function zeroFill(number, width = Lengths.lengthShort) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + "";
}
```

- What do you think about the code above? (Hint: Bullet points are perfect!)
- Write down the method how you would have done it.
    - i think the above code is really complex to understand i had to run it to know what it does i had some general idea when first reading it but had to run it to understand also the conditional statement to add  + 2 or  + 1 based on the decimal point just to join 0 and this whole logic is complex to understand although it works
    - what i would do is the below code
```javascript
const Lengths = {
lengthShort: 0,
lengthMedium: 5,
lengthLarge: 10
};

function zeroFill(number, width = Lengths.lengthShort) {
width -= number.toString().length;
let zeroes = "";
if (width > 0) {
    if(/\./.test(number)) {
        width += 1
    }
    while (width > 0) {
        zeroes += "0";
        width--;
    }
}
return zeroes + number;
}
```

We would like to see a list of things you would change or improve. Simply go through the code line by line and compile a list what is good or bad.

Something like:

- Line X is hard to read. I would split this up.
- There is a symbol missing in line X
- I prefer UpperCase in line X, because of coding conventions
- There is an easier way to do stuff in line X
- Here is my final code: …

Try to collect as much as you can and make sure you do not spend more than 15 minutes on this task.

I would do the following:
    -- i would make lengthShort, lengthMedium, lengthLarge variable names all caps since they are constants.
    -- i would split the conditional statment of the regex to be first (add whatever we need to the width) then write new Array(width).join("0") + number;
    -- i would rename the method to fillLeadingZeroes to better indicate what the method does to the number
    -- lastly i would add a comment before the line of 
    `width += (/\./.test(number) ? 2 : 1;` to better indicate why we are adding 1 and 2. 

## TEST 4 - API & MongoDB

Prerequisites: PostmarkApp, MongoDB

You can use these credentials for PostmarkApp:

- User: `workerbase-test`
- Password: `4aefxDRAnRLXDUPkLpZnMvbT`

**Create an App which allows the user to send emails and to specify Recipient, Subject and Body (Text) and list the sent and received e-mails with Sender/Recipient, Subject and Body. Feel free to use any libraries / services you want.**

The functions should be developed in the following order:

1. Send e-mails (Frontend Form) using the API of PostmarkApp.
2. Save the sent e-mails in MongoDB.
3. Receive e-mails using the API of PostmarkApp (Hint: Webhook).
4. Save the received e-mails in MongoDB.
5. List the Sent/Received e-mails at the Frontend.
6. Send the source code and either a way to run the app locally or a link to the hosted version somewhere.

- The Frontend can use any technology you want (feel free to use React)
- Use the API of PostmarkApp to send e-mails.
- Use the API of PostmarkApp to receive e-mails.
- Save all data to the database.
- Design is not important. It's just about functionality and coding style.
- Bonus: Use Express.js if you need a HTTP framework.

This will take you some time to solve. Do not spend more than an hour. When time is over, just commit your changes and push the last working version, even if it is not perfect.

- To run this application
  - please clone both frontend and backend repos
  - `yarn` for both to download dependenices
  - `yarn start` for backend then for frontend. (Note: this order to make the frontend run on another port).

- for this task what still to do 
  - couldn't understand and implement web hooks since they were new to me.
  - add login & register cycle with jwt so no need to add the from field in sending emails and to access the email inside the backend endpoint for getting the emails list and this way i will remove its hardcoding.

## TEST 5 - Testing - BONUS

- Configure the project (TEST 4) to execute ESLint on all JavaScript files in the project when `npm test` is run.
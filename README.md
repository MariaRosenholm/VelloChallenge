# Vello Coding Challenge

Welcome to the Vello coding challenge! Your mission is to finish some of the functionality of this application.

## We'd like for you to spend around an hour or two on the task.

#### If you don't finish the assignment, that's ok! We are evaluating you on how you approach this task and the choices you made while working on it. Don't worry if you don't fully complete it.

Please make sure you at least share your repository with us and are ready for to discuss the task.

## Use the correct node version

In order to run the tests, you need to be using one of the newer node versions. You should use at least `v18.17`.

I recommend using [Node version manager](https://github.com/nvm-sh/nvm) to set your node version if you already have another version installed.

## Create a repository from this template

Before you can begin, [you need to create a repository this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

------

# The Task

1. Populate the database
2. Build the database functions
3. Build the endpoints
4. Prepare a demonstration
5. Share your code solution with us

## 1. Populate the database

First we want you to import the data from [person.csv](./data-sources/person.csv) to [person.json](./data/person.json)

- You can use the data from `person-small.csv` while testing, but we expect the that your hand-in to be using the complete dataset from `person.csv`
- Write your import script in [import_data.js](./src/import_data.js)
- You should make it possible to use the following command to import the data:

```
# Note! You have to set this command up yourself.


$ npm run db:import
```

Once you've done that, the application should be able to access the data.

## 2. Build the database functions

Implement the functionality in [DatabaseTable.js](./src/lib/DatabaseTable.js)

## 3. Build the endpoints

Implement the functionality in [person/routes.js](./src/modules/person/routes.js)

If necessary, you should create new files for containing the logic these functions will use.

## 4. Prepare a demonstration

We'd like to see that your application works as expected. All the tests should pass and you should have built some way to show us that the endpoints work as expected. This can be through node.js script(s), a simple frontend application or [additional test cases](./test/modules/person/routes.test.js).

## 5. Share your code solution with us

Share your repository with us. You can send a link to the repository through email or LinkedIn.

If you have any questions please contact us:

Alex Haase alex@vello.fi

Good Luck! We will be more than happy to talk about your solution.


------
------
------

# Running the application

### Install modules
```
$ npm ci
```

### Import external data
```
$ npm run db:import
```

###### You need to add this script yourself

### Run the application
```
$ npm start
```

# Testing the application

First, install the modules, then run the following script:
```
$ npm test
```

Note that all the tests will fail until you have implemented the functionality.


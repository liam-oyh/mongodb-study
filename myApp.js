require('dotenv').config();
const mongoose = require('mongoose');

let myURI = process.env['MONGO-URI'];


mongoose.connect(myURI, { UseNewUrlParser: true, UseUnifiedTopology: true});

let personSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  age :  Number,
  favoriteFoods : [String]  
});

const Person = mongoose.model('Person', personSchema);



const createAndSavePerson = (done) => {
  let adaWong = new Person ({
    name: "Ada Wong",
    age: 32,
    favoriteFoods: ['apple', 'KFC']
  });

  adaWong.save(function(err, data){
  if (err) return console.error(err);
  done(null, data)
        });
};

 var arrayOfPeople = [{
    name: "John Wick",
    age: 33,
    favoriteFoods:['walnut', "Tims"]
  },{
    name: "Bruce Wayne",
    age: 34,
    favoriteFoods:['rat', "joker"]
  }];
   

const createManyPeople = (arrayOfPeople, done) => {
 Person.create(arrayOfPeople, function(err, data){
  if (err) return console.error(err);
  done(null, data);
        });
 
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }
             )
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

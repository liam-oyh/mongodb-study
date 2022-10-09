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
  Person.findOne({
    favoriteFoods: food
  }, function(err, data){
    if (err) return console.error(err);
    done(null, data);
  })
 };

const findPersonById = (personId, done) => {
 Person.findById(personId, function (err, data) {
     if (err) return console.error(err);
       done(null, data);
   }) 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
     if (err) return console.error(err);
  
      person.favoriteFoods.push(foodToAdd);

      person.save((err, updatedPerson)=>{
        if (err) return console.error(err);
        done(null, updatedPerson)
        })
})};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
     (err, updatedPerson)=>{
        if (err) return console.error(err);
        done(null, updatedPerson)
        }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person)=>{
    if (err) return console.error(err);
    done(null, person)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name: nameToRemove},
    (err, removeInfo)=>{
      if (err) return console.error(err);
      done(null, removeInfo)
    }
  )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name:1})
        .limit(2)
        .select({age: 0})
        .exec((err, people)=>{
      if (err) return console.error(err);
      done(null, people)
    })
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

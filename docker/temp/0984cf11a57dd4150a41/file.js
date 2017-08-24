
  
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = () => {
  console.log('sup. my name is ', this.name, '\n');
};

Person.prototype.sayGoodBye = () => {
  console.log('peace \n')
}

function Student(name, age, major) {
  Person.call(name, age);
  this.major = major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

Student.prototype.sayMajor = () => {
  console.log('I study ', this.major, '\n')
}

const akshay = new Student('Akshay', 19, 'Computer Science');
akshay.sayHello();//name is undefined??
akshay.sayMajor();//major is undefined??
akshay.sayGoodBye();
  
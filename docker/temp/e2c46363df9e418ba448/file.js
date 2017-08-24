const $SPECIALVAR123$chosenMajor = "Statistics"
const $SPECIALVAR123$chosenStudent = "Nishant"
const $SPECIALVAR123$chosenAge = "21"

  
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
  console.log('#SPECIALTAG123#DONTDISPLAYBELOW#')
  const $SPECIALVAR123$student = new Student($SPECIALVAR123$chosenStudent, $SPECIALVAR123$chosenAge, $SPECIALVAR123$chosenMajor);
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayHello() STDOUT::#asyncBelowFlag#:1')
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayMajor() STDOUT::#asyncBelowFlag#:2')
  console.log('#SPECIALTAG123#ToTest#::testStudent.sayGoodBye() STDOUT::#asyncBelowFlag#:3')
  console.log('#SPECIALTAG123#asyncBelowFlag#::1')
  $SPECIALVAR123$student.sayHello();
  console.log('#SPECIALTAG123#asyncBelowFlag#::2')
  $SPECIALVAR123$student.sayMajor();
  console.log('#SPECIALTAG123#asyncBelowFlag#::3')
  $SPECIALVAR123$student.sayGoodBye();

  
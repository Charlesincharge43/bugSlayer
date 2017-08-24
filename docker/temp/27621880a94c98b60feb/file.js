
  var majors = [
    'Psychology',
    'Computer Science',
    'Literature',
    'Biology',
    'History',
    'Chemistry',
    'Statistics',
    'Economics'
    ];

  var students = [
    'Charles',
    'Nishant',
    'Jacob',
    'Nick',
    'Connie',
    'Gabi',
    'Alex',
    'Ellie',
    'Akshay',
    'Camden',
    'Kevin',
    'Willy',
    'Tim',
    'Ben',
    'Collin'
  ]

  function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var chosenMajor = majors[randomInt(1,majors.length-1)]
  var chosenStudent = students[randomInt(1,students.length-1)]
  var chosenAge = randomInt(18,30)

  console.log('const $SPECIALVAR123$chosenMajor = "'+chosenMajor+'"')
  console.log('const $SPECIALVAR123$chosenStudent = "'+chosenStudent+'"')
  console.log('const $SPECIALVAR123$chosenAge = "'+chosenAge+'"')
  
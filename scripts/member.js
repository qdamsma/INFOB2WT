class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Course {
    constructor(title, teacher, description) {
        this.title = title;
        this.teacher = new Person(teacher.firstName, teacher.lastName);
        this.description = description;
    }
}

class Student extends Person {
    constructor(firstName, lastName, age, hobbies, email, photo, major, courses, intro, texts1, head1, texts2, head2, texts3) {
        super(firstName, lastName);
        this.age = age;
        this.hobbies = hobbies;
        this.email = email;
        this.photo = photo;
        this.major = major;
        this.courses = courses.map(course => new Course(course.title, course.teacher, course.description));
        this.intro = intro;
        this.texts1 = texts1;
        this.head1 = head1;
        this.texts2 = texts2;
        this.head2 = head2;
        this.texts3 = texts3;
    }
}

// Functie om JSON-bestand in te laden
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = JSON.parse(e.target.result);
        const student = new Student(
            data.firstName, data.lastName, data.age, data.hobbies, data.email, data.photo, data.major,
            data.courses, data.introduction, data.texts1, data.head1, data.texts2, data.head2, data.texts3
        );
        displayStudent(student);
    };
    reader.readAsText(file);
});

// Functie om de data te displayen
function displayStudent(student) {
    const mainContainer = document.getElementById('mainContent');

    // Maakt de section om cards te displayen
    const cardsection = document.createElement('section');
    cardsection.classList.add('cards-container');

    // Maakt een card aan en voegt de card klasse toe voor dezelfde css
    const card = document.createElement('a');
    card.classList.add('card');

    // Maakt image element aan met alt, src en klassen
    const img = document.createElement('img');
    img.src = student.photo;
    img.alt = student.firstName;
    img.classList.add("card__image", "card__image--Mem1");
    
    // Maakt header aan voor de namen met klasse
    const name = document.createElement('h2');
    name.textContent = student.firstName;
    name.classList.add("card__header");
    
    // Maakt de beschrijving aan
    const intro = document.createElement('p');
    intro.textContent = student.intro;
    intro.classList.add("card__paragraph")

    // Voegt image naam en beschrijving toe aan de card, wordt vervolgens toegevoed aan de cardselection en deze wordt weergegeven op de pagina
    cardsection.append(card);
    card.append(img, name, intro);
    mainContainer.appendChild(cardsection);
}


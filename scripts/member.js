class Person {

    // #firstName;
    // #lastName;


    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // get firstName() {
    //     return this.#firstName;
    // }

     // PROBLEEM: hij pakt é niet in voornamen nu, kan je kijken naar een fix?

    // set firstName(value) {
    //     if (!/^[A-Za-z\s]+$/.test(value)) {
    //         throw new Error("Ongeldige Voornaam");
    //     }
    //     this.#firstName = value;
    // }

    // get lastName() {
    //     return this.#lastName;
    // }

    // set lastName(value) {
    //     if (!/^[A-Za-z\s]+$/.test(value)) {
    //         throw new Error("Ongeldige achternaam");
    //     }
    //     this.#lastName = value;
    // }
}

class Course {
    constructor(title, teacher, description) {
        this.title = title;
        this.teacher = new Person(teacher.firstName, teacher.lastName);
        this.description = description;
    }
}

class Student extends Person {
    constructor(firstName, lastName, age, hobbies, email, photo, major, courses, intro, head1, texts1, head2, texts2, head3, texts3, head4, texts4) {
        super(firstName, lastName);
        this.age = age;
        this.hobbies = hobbies;
        this.email = email;
        this.photo = photo;
        this.major = major;
        this.courses = courses.map(course => new Course(course.title, course.teacher, course.description));
        this.intro = intro;
        this.head1 = head1;
        this.texts1 = texts1;
        this.head2 = head2;
        this.texts2 = texts2;
        this.head3 = head3;
        this.texts3 = texts3;
        this.head4 = head4;
        this.texts4 = texts4;
    }
}

// Functie om JSON-bestand in te laden
const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = JSON.parse(e.target.result);
            const student = new Student(
                data.firstName, data.lastName, data.age, data.hobbies, data.email, data.photo, data.major,
                data.courses, data.introduction, data.head1, data.texts1, data.head2, data.texts2, data.head3, data.texts3, data.head4, data.texts4
            );
            displayStudent(student);
        };
        reader.readAsText(file);
    });
}

// Functie om de data te displayen
function displayStudent(student) {
    localStorage.setItem('studentData', JSON.stringify(student));

    const mainContainer = document.getElementById('mainContent');

    // Maakt een kaart aan en voegt de klasse toe
    const card = document.createElement('a');
    card.classList.add('card');
    card.href = "member.html";

    // Maakt image element aan
    const img = document.createElement('img');
    img.src = student.photo;
    img.alt = student.firstName;
    img.classList.add("card__image", "card__image--Mem1");

    // Naam toevoegen
    const name = document.createElement('h2');
    name.textContent = student.firstName;
    name.classList.add("card__header");

    // Intro toevoegen
    const intro = document.createElement('p');
    intro.textContent = student.intro;
    intro.classList.add("card__paragraph");

    // Voeg alle elementen toe aan de kaart
    card.append(img, name, intro);

    card.addEventListener('click', () => {
        localStorage.setItem('studentData', JSON.stringify(student));
    });

    // Voeg de kaart toe aan de pagina
    mainContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', function () {
    
    const studentData = localStorage.getItem('studentData');

    if (studentData) {
        const data = JSON.parse(studentData);
        const student = new Student(
            data.firstName, data.lastName, data.age, data.hobbies, data.email, data.photo, data.major,
            data.courses, data.intro, data.head1, data.texts1, data.head2, data.texts2, data.head3, data.texts3, data.head4, data.texts4
        );
        showStudentDetails(student);
    } else {
        console.warn("Geen student data gevonden in localStorage.");
    }
});

function showStudentDetails(student) {
    const content = document.getElementById('memberContainer');
    if (!content) {
        return;
    }

    const card = document.createElement('section');
    card.classList.add('card');

    const about = document.createElement('article');
    about.classList.add('about-textbox');

    const img = document.createElement('img');
    img.src = student.photo;
    img.alt = student.firstName;
    img.classList.add("card__image", "card__image--Mem1");

    const name = document.createElement('h2');
    name.textContent = student.firstName;
    name.classList.add("card__header");

    const intro = document.createElement('p');
    intro.textContent = student.intro;
    intro.classList.add("card__paragraph");

    card.append(img, name, intro);

    const head1 = document.createElement('h3');
    head1.textContent = student.head1;
    head1.classList.add("about-textbox__head");
    about.appendChild(head1);

    const texts1 = document.createElement('p');
    texts1.textContent = student.texts1;
    texts1.classList.add("about-textbox__para");
    about.appendChild(texts1);

    const head2 = document.createElement('h3');
    head2.textContent = student.head2;
    head2.classList.add("about-textbox__head");
    about.appendChild(head2);

    const texts2 = document.createElement('p');
    texts2.textContent = student.texts2;
    texts2.classList.add("about-textbox__para");
    about.appendChild(texts2);

    const head3 = document.createElement('h3');
    head3.textContent = student.head3;
    head3.classList.add("about-textbox__head");
    about.appendChild(head3);

    const texts3 = document.createElement('p');
    texts3.textContent = student.texts3;
    texts3.classList.add("about-textbox__para");
    about.appendChild(texts3);

    const head4 = document.createElement('h3');
    head4.textContent = student.head4;
    head4.classList.add("about-textbox__head");
    about.appendChild(head4);

    const texts4 = document.createElement('p');
    texts4.textContent = student.texts4;
    texts4.classList.add("about-textbox__para");
    about.appendChild(texts4);

    const hobbyList = document.createElement('ul');
    hobbyList.classList.add("about-textbox__list");

    student.hobbies.forEach(hobby => {
        const listItem = document.createElement('li');
        listItem.textContent = hobby;
        hobbyList.appendChild(listItem);
    });

    about.appendChild(hobbyList);

    content.appendChild(card);
    content.appendChild(about);
}

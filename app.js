const list = document.getElementById("links-table-body"); 
const linksForm = document.getElementById('links-form');
const topic = document.getElementById('topic');
const slink = document.getElementById('slink');
const contentType = document.getElementById('content-type');


// StudyLink Class: Represents a study link
class StudyLink {
    constructor(topic, study_link, study_type) {
        this.topic = topic;
        this.study_link = study_link;
        this.study_type = study_type;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static counter = 0;
    static displayLinks() {
        const study_links = [
            {
                topic: 'Docker',
                study_link: 'https://www.docker.com/',
                study_type: 'official'
            }, {
                topic: 'Event Loop',
                study_link: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
                study_type: 'video'
            }, {
                topic: 'JavaScript engines',
                study_link: 'https://www.youtube.com/watch?v=p-iiEDtpy6I',
                study_type: 'video'
            }, {
                topic: 'React Elements vs React Components',
                study_link: 'https://ui.dev/react-elements-vs-react-components/',
                study_type: 'blog'
            }
        ];
        const links = study_links;

        links.forEach(link => UI.addLinkToList(link));
    }

    static addLinkToList(link) {
        // Add row to table for each link
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope="row">${++UI.counter}</th>
        <td>${link.topic}</td>
        <td><a href="${link.study_link}" target="_blank">${link.study_link}</a></td>
        <td>${link.study_type}</td>
        `;
        list.appendChild(row);
    }
}

// Store Class: Handles LocalStorage

// Event: Display Links
document.onload = UI.displayLinks();

// Event: Add a Link
linksForm.onsubmit = function (e) {
    e.preventDefault();
    console.log(topic.value, slink.value, contentType.value);
    const newLink = new StudyLink(topic.value, slink.value, contentType.value);
    UI.addLinkToList(newLink);
}


// Event: Remove a Link
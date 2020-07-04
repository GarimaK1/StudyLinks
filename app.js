const container = document.querySelector('.container');
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
        <td>${link.topic}</td>
        <td><a href="${link.study_link}" target="_blank">${link.study_link}</a></td>
        <td>${link.study_type}</td>
        <td><button class="btn btn-danger btn-sm delete">X</button></td>
        `;
        list.appendChild(row);
    }

    static clearFormFields() {
        topic.value = "";
        slink.value = "";
    }

    static showAlert(message, className) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${className}`;
        alertDiv.appendChild(document.createTextNode(message));
        container.insertBefore(alertDiv, linksForm);
        // Remove alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static removeLink(e) {
        // We want to delete "tr". Button's parent: "td". td's parent: "tr"
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
            // Show removed alert
            UI.showAlert('Link removed successfully!', 'warning');
        }

    }
}

// Store Class: Handles LocalStorage

// Event: Display Links
document.addEventListener('DOMContentLoaded', UI.displayLinks);

// Event: Add a Link
linksForm.onsubmit = (e) => {
    // Prevent submit to server
    e.preventDefault();

    // Get form values to instantiate new StudyLink object
    const newLink = new StudyLink(topic.value, slink.value, contentType.value);
    UI.addLinkToList(newLink);

    // Show success alert
    UI.showAlert('New link added successfully!', 'primary');

    // Clear text fields
    UI.clearFormFields();
}

// Event: Remove a Link
list.addEventListener('click', UI.removeLink);

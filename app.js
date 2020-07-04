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
        const links = LocalStore.getLinks();

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

            // Remove from LocalStorage
            const targetHref = e.target.parentElement.parentElement.children[1].firstChild.href;
            console.log('calling LS', targetHref);
            LocalStore.removeLink(targetHref);
        }
    }
}

// Store Class: Handles LocalStorage
class LocalStore {
    static getLinks() {
        let links;
        if (localStorage.getItem('links') === null) {
            links = [];
        } else {
            links = JSON.parse(localStorage.getItem('links'));
        }
        return links;
    }

    static addLink(link) {
        const links = LocalStore.getLinks();
        links.push(link);
        localStorage.setItem('links', JSON.stringify(links));
    }

    static removeLink(targetHref) {
        const links = LocalStore.getLinks();
        links.forEach((link, index) => {
            if (link.study_link === targetHref) {
                links.splice(index, 1);
            } else {
                if (link.study_link.endsWith('/')) {
                    if (link.study_link === targetHref)
                        links.splice(index, 1);
                } else {
                    link.study_link += "/";
                    if (link.study_link === targetHref)
                        links.splice(index, 1);
                }
            }
        });
        // links.filter not working.
        localStorage.setItem('links', JSON.stringify(links));
    }
}

// Event: Display Links
document.addEventListener('DOMContentLoaded', UI.displayLinks);

// Event: Add a Link
linksForm.onsubmit = (e) => {
    // Prevent submit to server
    e.preventDefault();

    // Get form values to instantiate new StudyLink object
    const newLink = new StudyLink(topic.value, slink.value, contentType.value);
    UI.addLinkToList(newLink);

    // Add link to LocalStorage
    LocalStore.addLink(newLink);

    // Show success alert
    UI.showAlert('New link added successfully!', 'primary');

    // Clear text fields
    UI.clearFormFields();
}

// Event: Remove a Link
list.addEventListener('click', UI.removeLink);

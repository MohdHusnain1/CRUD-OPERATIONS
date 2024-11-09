const apiUrl = "https://672deb73fd8979715644479d.mockapi.io/webtech/api/v1/assignment";

// Function to show alert on CRUD operations
function showAlert(action) {
    alert(`CRUD Operation Performed: ${action}`);
}

// Fetch and display assignments
async function fetchAssignments() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const assignmentList = document.getElementById("assignmentList");
    assignmentList.innerHTML = "";

    data.forEach(assignment => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${assignment.id}</td>
            <td>${assignment.title}</td>
            <td>${assignment.description}</td>
            <td class="actions">
                <button onclick="editAssignment(${assignment.id}, '${assignment.title}', '${assignment.description}')">Edit</button>
                <button onclick="deleteAssignment(${assignment.id})">Delete</button>
            </td>
        `;
        assignmentList.appendChild(row);
    });

    // Alert for Read operation
    showAlert("Read");
}

// Create a new assignment
async function createAssignment(title, description) {
    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    });
    fetchAssignments();

    // Alert for Create operation
    showAlert("Create");
}

// Update an existing assignment
async function updateAssignment(id, title, description) {
    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    });
    fetchAssignments();

    // Alert for Update operation
    showAlert("Update");
}

// Delete an assignment
async function deleteAssignment(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
    fetchAssignments();

    // Alert for Delete operation
    showAlert("Delete");
}

// Handle form submission
document.getElementById("assignmentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("assignmentId").value;
    const title = document.getElementById("assignmentTitle").value;
    const description = document.getElementById("assignmentDescription").value;

    if (id) {
        updateAssignment(id, title, description);
        document.getElementById("submitButton").textContent = "Add Assignment";
    } else {
        createAssignment(title, description);
    }

    document.getElementById("assignmentForm").reset();
    document.getElementById("assignmentId").value = "";
});

// Edit an existing assignment
function editAssignment(id, title, description) {
    document.getElementById("assignmentId").value = id;
    document.getElementById("assignmentTitle").value = title;
    document.getElementById("assignmentDescription").value = description;
    document.getElementById("submitButton").textContent = "Update Assignment";
}

// Initial data fetch
window.onload = () => {
    fetchAssignments();
    alert("Application Loaded Successfully");
};
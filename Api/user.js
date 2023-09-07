// Define a function to make AJAX XML requests
export { userApi };

function sendXmlHttpRequest(method, url, data, successCallback, errorCallback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        successCallback(response);
      } else {
        errorCallback(xhr.status, JSON.parse(xhr.responseText));
      }
    }
  };

  xhr.send(data ? JSON.stringify(data) : null);
}


const userApi = {
  authenticateUser(payload, successCallback, errorCallback) {
    sendXmlHttpRequest('POST', 'http://localhost:3000/users/authenticate', payload, successCallback, errorCallback);
  },

  registerUser(payload, successCallback, errorCallback) {
  console.log('in the register user');
    sendXmlHttpRequest('POST', 'http://localhost:3000/users/register', payload, successCallback, errorCallback);
  },

  updateUser(id, name, password, successCallback, errorCallback) {
    sendXmlHttpRequest('PUT', `/users/${id}/updateUser`, { name, password }, successCallback, errorCallback);
  },

  deleteUserAccount(id, successCallback, errorCallback) {
    sendXmlHttpRequest('DELETE', `/users/${id}`, null, successCallback, errorCallback);
  },

  fetchUsers(successCallback, errorCallback) {
    sendXmlHttpRequest('GET', '/users/all', null, successCallback, errorCallback);
  },

  updateUserRole(id, role, successCallback, errorCallback) {
    sendXmlHttpRequest('PUT', `/users/${id}/updateRole`, { role }, successCallback, errorCallback);
  },
};

// /* Example usage:
// const payload = { /* Your payload data here */ };
// userApi.registerUser(
//   payload,
//   function (response) {
//     // Handle success
//     console.log('Registration successful!', response);
//   },
//   function (status, errorResponse) {
//     // Handle error
//     console.error('Error registering user:', status, errorResponse);
//     // Display an error message to the user
//     alert('Registration failed. Please try again later.');
//   }
// );


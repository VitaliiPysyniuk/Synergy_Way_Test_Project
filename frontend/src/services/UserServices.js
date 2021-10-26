class UserServices {
    apiUrl = 'http://localhost:8000/user';

    async getAllUsers() {
        const response = await fetch(this.apiUrl)
            .then(value => value.json());
        return response;
    }

    async getUserById(userId) {
        const response = await fetch(`${this.apiUrl}/${userId}`)
            .then(value => value.json());
        return response;
    }

    async addUser(userData) {
        const response = await fetch(this.apiUrl,
            {method: 'POST', body: JSON.stringify(userData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status)
        return response;
    }

    async updateUser(userId, userData) {
        const response = await fetch(`${this.apiUrl}/${userId}`,
            {method: 'PATCH', body: JSON.stringify(userData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status)
        return response;
    }

    async deleteUser(userId) {
        const response = await fetch(`${this.apiUrl}/${userId}`, {method: 'DELETE'})
            .then(value => value.status)
        return response;
    }
}

export const userServices = new UserServices();

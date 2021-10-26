class GroupServices {
    apiUrl = 'http://localhost:8000/group';

    async getAllGroups() {
        const response = await fetch(this.apiUrl).then(value => value.json());
        return response;
    }

    async getGroupById(groupId) {
        const response = await fetch(`${this.apiUrl}/${groupId}`).then(value => value.json());
        return response;
    }

    async addGroup(groupData) {
        const response = await fetch(this.apiUrl,
            {method: 'POST', body: JSON.stringify(groupData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status);
        return response;
    }

    async updateGroup(groupId, groupData) {
        const response = await fetch(`${this.apiUrl}/${groupId}`,
            {method: 'PATCH', body: JSON.stringify(groupData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status);
        return response;
    }

    async deleteGroup(groupId) {
        const response = await fetch(`${this.apiUrl}/${groupId}`, {method: 'DELETE'})
            .then(value => value.status);
        return response;
    }
}

export const groupServices = new GroupServices();

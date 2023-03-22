export class Data {
  constructor({ fetchURL = '' }) {
    this.fetchURL = fetchURL;
    // this.post = post;
    this.headers = { 'Content-Type': 'application/json' }
  }

  async getData() {
    const data = await fetch(this.fetchURL)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.error(error))

    return data || [];
  }

  async getDataItem(itemId) {
    const data = await fetch(`${this.fetchURL}/${itemId}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.error(error))

    return data;
  }

  async changeDataItem(itemId, obj) {
    const data = await fetch(
      `${this.fetchURL}${itemId}`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(obj)
      })
      .catch((error) => console.error(error))

    return data;
  }

  async deleteDataItem(itemId) {
    const url =`${this.fetchURL}${itemId}`;

    const data = await fetch(
      url,
      {
        method: 'DELETE',
      })
      .catch((error) => console.error(error))

    return data;
  }

  async addData(post) {
    return await fetch(
      this.fetchURL,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(post)
      })
      .catch((error) => console.error(error))
  }
}

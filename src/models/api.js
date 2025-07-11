const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1/';

  async function _fetchGuest(endPoint, options = {}) {
    const response = await fetch(BASE_URL + endPoint, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, data, message } = responseJson;

    if (status !== 'success' || !response.ok) {
      throw new Error(message || 'unexpected error occurred');
    }

    return data;
  }

  async function _fetchAuth(endPoint, options = {}) {
    const token = getAccessToken();
    if (!token) {
      // alert('Anda belum login!');
      throw new Error('No access token found');
    }
    return _fetchGuest(endPoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function register({ email, name, password }) {
    const { user } = await _fetchGuest('register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });
    return user;
  }

  async function login({ email, password }) {
    const { token } = await _fetchGuest(`login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return token;
  }

  async function getAllUsers() {
    const { users } = await _fetchGuest(`users`, {
      method: 'GET',
    });

    return users;
  }

  async function getOwnProfile() {
    const { user } = await _fetchAuth(`users/me`, {
      method: 'GET',
    });

    return user;
  }

  async function createThread({ title, body, category = '' }) {
    const { thread } = await _fetchAuth(`threads`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });
    return thread;
  }

  async function getAllThreads() {
    const { threads } = await _fetchGuest(`threads`, {
      method: 'GET',
    });
    return threads;
  }

  async function getThreadDetail(id) {
    const { detailThread } = await _fetchGuest(`threads/${id}`, {
      method: 'GET',
    });
    return detailThread;
  }

  async function createComment(threadId, content) {
    const { comment } = await _fetchAuth(`threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
    });
    return comment;
  }

  async function setUpVote(threadId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/up-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function setDownVote(threadId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/down-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function setNeutralVote(threadId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function setUpVoteComment(threadId, commentId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function setDownVoteComment(threadId, commentId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function setNeutralVoteComment(threadId, commentId) {
    const { vote } = await _fetchAuth(`threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
    });

    return vote;
  }

  async function getLeaderboards() {
    const leaderboards = await _fetchGuest(`leaderboards`, {
      method: 'GET',
    });
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadDetail,
    createComment,
    setUpVote,
    setDownVote,
    setNeutralVote,
    getLeaderboards,
    setUpVoteComment,
    setDownVoteComment,
    setNeutralVoteComment,
  };
})();

export default api;

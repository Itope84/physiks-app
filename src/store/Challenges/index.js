function initialState () {
  return {
    users: [
      {
        username: 'Santiago',
        points: '240',
        level: 6,
        challenges_count: 10
      },
      {
        username: 'Santiago',
        points: '240',
        level: 6,
        challenges_count: 10
      },
      {
        username: 'Santiago',
        points: '240',
        level: 6,
        challenges_count: 10
      },
      {
        username: 'Santiago',
        points: '240',
        level: 6,
        challenges_count: 10
      },
      {
        username: 'Santiago',
        points: '240',
        level: 6,
        challenges_count: 10
      }
    ]
  }
}

const getters = {
  users: state => state.users
}
export default {
  namespaced: true,
  state: initialState,
  getters
  // actions,
  // mutations
}

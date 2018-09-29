import axios from '../../http'

function initialState () {
  return {
    modules: [
      {
        title: 'Electromagnetism',
        summary: 'skjdnfcklsab sa,mfndhcsjakdn sdbdnx sdhabdc dsfb csdbundkmncdsnh vjdnf  vkdfnvsd vkvndl fdvkdfn vdvjd dfvkjd fvjklmslkfd;l,v d,a csdvs;d dkm;ld vkjnsdl vsjfkldsmf sdvjksdn sdjasn;ldmfndm sd ljdnl;sd sjdnvfkldsf fvjndf sdfjusdnfklsd f'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      },
      {
        title: 'Electromagnetism',
        summary: 'Dummy dummy'
      }
    ]
  }
}

const getters = {
  modules: state => state.modules
}

const actions = {
  fetchModules ({commit}) {
    // check if localstorage.modules is set
    let modules = localStorage.getItem('modules')
    if (modules) {
      commit('setModules', modules)
    }
    axios.get('modules')
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions
  // mutations
}

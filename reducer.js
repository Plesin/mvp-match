export const initialState = {
  user: null,
  projects: {
    byId: {},
    allIds: [],
  },
  gateways: {
    byId: {},
    allIds: [],
  },
  report: {
    byProjectId: {},
    byGatewayId: {},
    total: '', // this is formated value
  },
  filter: {},
  isLoading: false,
}

export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const PROJECTS_FETCH_SUCCESS = 'PROJECTS_FETCH_SUCCESS'
export const GATEWAYS_FETCH_SUCCESS = 'GATEWAYS_FETCH_SUCCESS'
export const REPORT_FETCH_SUCCESS = 'REPORT_FETCH_SUCCESS'
export const REPORT_LOADING = 'REPORT_LOADING'

export default function reducer(state, action) {
  switch (action.type) {
    case REPORT_LOADING:
      return { ...state, isLoading: action.payload }
    case USER_FETCH_SUCCESS:
      return { ...state, user: action.payload }
    case PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      }
    case GATEWAYS_FETCH_SUCCESS:
      return {
        ...state,
        gateways: action.payload,
      }
    case REPORT_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        report: action.payload.report,
        filter: action.payload.filter,
      }
    default:
      throw new Error(`Uknown action: ${action}.`)
  }
}

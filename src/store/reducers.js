import * as type from './actionTypes'

export const token = (state = '', action) => {
	if (action.type === type['SET_TOKEN']) {
		return action.payload
	}
	return state
}
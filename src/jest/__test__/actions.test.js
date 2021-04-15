import * as actions from '../../store/data/actions' 

describe('actions', () => {
  it('should get the data from server', () => {
    const json = [{}]
    const expectedAction = {
      type: actions.RECEIVE_DATA,
      data: json,
      loading: false
    }
    expect(actions.receiveData(json)).toEqual(expectedAction);
  })

  it('should get single data from server', () => {
    const json = [{}]
    const expectedAction = {
      type: actions.RECEIVE_SINGLE_DATA,
      data: json,
      loading: false
    }
    expect(actions.receiveSingleData(json)).toEqual(expectedAction);
  })
})
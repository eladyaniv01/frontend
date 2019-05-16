/*
export function someAction (context) {
}
*/
// cms

export function UpdateRightBlocks({ state, commit }, payload) {

    commit('UPDATERIGHTBLOCKS', payload)

}
export function UpdateLeftBlocks({ state, commit }, payload) {

    commit('UPDATELEFTBLOCKS', payload)

}
export function UpdateLandingHeader({ state, commit }, payload) {

    commit('UPDATELANDINGHEADER', payload)

}
export function UpdateLandingCards({ state, commit }, payload) {

    commit('UPDATELANDINGCARDS', payload)

}
export function UpdateStickyHeader({ state, commit }, payload) {

    commit('UPDATESTICKYHEADER', payload)

}
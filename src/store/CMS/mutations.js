/*
export function someMutation (state) {
}
*/
// CMS

export function UPDATERIGHTBLOCKS(state, payload) {
    if (!state.rightBlocks) {
        state.rightBlocks = payload
        return
    }

    // state.rightBlocks = _.union((state.rightBlocks, payload), state.rightBlocks)
    state.rightBlocks = payload

}
export function UPDATELEFTBLOCKS(state, payload) {
    if (!state.leftBlocks) {
        state.leftBlocks = payload
        return
    }

    // state.leftBlocks = _.union((state.leftBlocks, payload), state.leftBlocks)
    state.leftBlocks = payload

}
export function UPDATELANDINGHEADER(state, payload) {
    if (!state.landingHeader) {
        state.landingHeader = payload
        return
    }

    // state.leftBlocks = _.union((state.leftBlocks, payload), state.leftBlocks)
    state.landingHeader = payload

}
export function UPDATELANDINGCARDS(state, payload) {
    if (!state.landingCards) {
        state.landingCards = payload
        return
    }

    // state.leftBlocks = _.union((state.leftBlocks, payload), state.leftBlocks)
    state.landingCards = payload

}
export function UPDATESTICKYHEADER(state, payload) {
    if (!state.stickyHeader) {
        state.stickyHeader = payload
        return
    }

    // state.leftBlocks = _.union((state.leftBlocks, payload), state.leftBlocks)
    state.stickyHeader = payload

}
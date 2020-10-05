export const getNavLinks = (logo) => {
    return [{
        name: 'home',
        url: "/home",
        className: "fa fa-home"
    },
    {
        name: 'Unallocated Candidates',
        url: "/candidates",
        className: "fa fa-hand-holding-water"

    },
    {
        name: 'Allocated Candidates',
        url: "/viewAllocatedCandidates",
        className: "fa fa-check-circle"

    },
    {
        name: 'converted Candidates',
        url: "/convertedCandidates",
        className: "fa fa-check-double"

    },
    {
        name: 'staffs',
        url: "/staffs",
        className: "fa fa-user-tie"

    }]
}

export const teacherNavLink = () => {
    return [
    {
        name: 'Allocated Candidates',
        url: "/viewAllocatedCandidates",
        className: "fa fa-check-circle"

    }]
}
export const getNavLinks = (logo) => {
    return [{
        name: 'home',
        url: "/home",
        className: "fa fa-home"
    },
    {
        name: 'Candidates',
        url: "/candidates",
        className: "fa fa-hand-holding-water"

    },
    {
        name: 'converted Candidates',
        url: "/convertedCandidates",
        className: "fa fa-check-circle"

    },
    {
        name: 'staffs',
        url: "/staffs",
        className: "fa fa-user-tie"

    },{
        name: 'assets',
        url: '/assets',
        className: 'fa fa-file-image'
    },{
        name: 'whatsapp-broadcast',
        url: '/whatsapp-broadcast',
        className: 'fa fa-bullhorn'
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
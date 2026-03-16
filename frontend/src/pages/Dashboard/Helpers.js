export const getStatusBadge = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
        case 'Pending':
            return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
        case 'Cancelled':
            return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10';
        default:
            return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-500/10';
    }
};
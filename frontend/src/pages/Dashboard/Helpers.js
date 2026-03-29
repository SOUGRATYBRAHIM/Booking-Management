export const getStatusBadge = (status) => {
    switch (status) {
    case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    case 'Pending': return 'bg-amber-100 text-amber-700 border border-amber-200';
    case 'Cancelled': return 'bg-red-100 text-red-700 border border-red-200';
    default: return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};
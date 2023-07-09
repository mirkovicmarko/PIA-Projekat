export const WEBSITE_URL: string = 'http://localhost:4000';

export const USER_TYPES = { none: 'none', client: 'client', agency: 'agency', admin: 'admin' };

export const OBJECT_TYPES = {
    flat: 'flat',
    house: 'house'
}

export const MIN_ROOMS = 1, MAX_ROOMS = 3;

export const CANVAS_DIMENSIONS = 600;

export const JOB_STATUSES = {
    requested: 'requested',
    declined: 'declined',
    offered: 'offered',
    rejected: 'rejected',
    awaiting: 'awaiting',
    undergoing: 'undergoing',
    canceled: 'canceled',
    paid: 'paid'
};

export const CONSTRUCTION_STATUSES = {
    done: 'done',
    awaiting: 'awaiting',
    undergoing: 'undergoing'
};

export const JOB_STATUSES_GROUPED = {
    done: [JOB_STATUSES.canceled, JOB_STATUSES.paid, JOB_STATUSES.rejected, JOB_STATUSES.declined],
    awaiting: [JOB_STATUSES.requested, JOB_STATUSES.offered],
    undergoing: [JOB_STATUSES.awaiting, JOB_STATUSES.undergoing]
}

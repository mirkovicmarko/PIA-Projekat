export const ORIGIN_URL: string = 'http://localhost:4200';

export const SESSION_DATA = {
    user_id: 'user_id',
    user_type: 'user_type'
};

export const USER_TYPES = {
    none: 'none',
    client: 'client',
    agency: 'agency',
    admin: 'admin'
};

export const OBJECT_TYPES = {
    flat: 'flat',
    house: 'house'
}

export const MIN_ROOMS = 1, MAX_ROOMS = 3;

export const JOB_STATUSES = {
    requested: 'requested',
    offered: 'offered',
    rejected: 'rejected',
    active: 'active',
    canceled: 'canceled',
    paid: 'paid'
};

export const ROOM_RECONSTRUCTION_STATUSES = {
    done: 'done',
    awaiting: 'awaiting',
    undergoing: 'undergoing'
};

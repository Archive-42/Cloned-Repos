import { NotificationType } from '../actions/notificationActions';
export interface NotificationSideEffect {
    body: string;
    level: NotificationType;
    messageArgs?: object;
}
export default function (): Generator<any, void, unknown>;

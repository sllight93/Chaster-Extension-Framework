import { EventDto } from '../schema/config.dto';
import { ActionLogCreated, ActionLogCreatedEventEnum, ActionLogForPublic } from '@chasterapp/chaster-js/dist/api';

// Beispiel-Funktionen für verschiedene ActionLogForPublic-Types
function handleLocked(data: ActionLogForPublic) {
  console.log('Handling locked event with data:', data);
  // Füge hier die Logik für das Event hinzu
}

function handleUnlocked(data: ActionLogForPublic) {
  console.log('Handling unlocked event with data:', data);
  // Füge hier die Logik für das Event hinzu
}

// Weitere Handler-Funktionen für die anderen ActionLogForPublic-Types
// ...

// Funktion zum Verarbeiten von ActionLogForPublic-Events
function handleActionLogCreated(data: ActionLogCreated) {
  if (!data || !data.data || !data.data.actionLog) {
    console.error('Invalid data structure for ActionLogCreated:', data);
    return;
  }

  const actionLog = data.data.actionLog;
  switch (actionLog.type) {
    case 'locked':
      handleLocked(actionLog);
      break;
    case 'unlocked':
      handleUnlocked(actionLog);
      break;
    // Weitere Cases für die anderen ActionLogForPublic-Types
    case 'deserted':
      console.log('Handling deserted event with data:', actionLog);
      break;
    case 'timer_hidden':
      console.log('Handling timer_hidden event with data:', actionLog);
      break;
    case 'timer_revealed':
      console.log('Handling timer_revealed event with data:', actionLog);
      break;
    case 'time_logs_hidden':
      console.log('Handling time_logs_hidden event with data:', actionLog);
      break;
    case 'time_logs_revealed':
      console.log('Handling time_logs_revealed event with data:', actionLog);
      break;
    case 'time_changed':
      console.log('Handling time_changed event with data:', actionLog);
      break;
    case 'locktober_points_changed':
      console.log('Handling locktober_points_changed event with data:', actionLog);
      break;
    case 'combination_verified':
      console.log('Handling combination_verified event with data:', actionLog);
      break;
    case 'combination_failed':
      console.log('Handling combination_failed event with data:', actionLog);
      break;
    case 'lock_frozen':
      console.log('Handling lock_frozen event with data:', actionLog);
      break;
    case 'lock_unfrozen':
      console.log('Handling lock_unfrozen event with data:', actionLog);
      break;
    case 'session_offer_accepted':
      console.log('Handling session_offer_accepted event with data:', actionLog);
      break;
    case 'max_limit_date_increased':
      console.log('Handling max_limit_date_increased event with data:', actionLog);
      break;
    case 'max_limit_date_removed':
      console.log('Handling max_limit_date_removed event with data:', actionLog);
      break;
    case 'keyholder_trusted':
      console.log('Handling keyholder_trusted event with data:', actionLog);
      break;
    case 'link_time_changed':
      console.log('Handling link_time_changed event with data:', actionLog);
      break;
    default:
      console.warn(`No handler found for action log type: ${actionLog.type}`);
  }
}

// Funktion zum Verarbeiten von Events
export function handleEvent(event: EventDto) {
  if (event.event === 'action_log.created') {
    handleActionLogCreated(event as ActionLogCreated);
  } else {
    console.warn(`No handler found for event: ${event.event}`);
  }
}




function handleLinkVote(event) {

    const time = event.data.actionLog.payload.duration;
    const username = event.data.actionLog.user.username;







}




// Thai Easy Card — 每日提醒通知管理器
const NotificationManager = (() => {
  let _timer = null;

  function getNextTriggerMs(h, m) {
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }
    return target.getTime() - now.getTime();
  }

  async function requestPermission() {
    if (!('Notification' in window)) return 'denied';
    return Notification.requestPermission();
  }

  function scheduleDaily(h, m) {
    if (_timer) clearTimeout(_timer);
    const ms = getNextTriggerMs(h, m);
    _timer = setTimeout(() => {
      fire();
      scheduleDaily(h, m); // 遞迴排明天
    }, ms);
  }

  async function fire() {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    new Notification('Thai Easy Card 🇹🇭', {
      body: '今天還沒練習泰語！保持連續學習，進步最快。',
      tag: 'daily-reminder',
      icon: '/icons/icon-192.png',
    });
  }

  function cancel() {
    if (_timer) {
      clearTimeout(_timer);
      _timer = null;
    }
  }

  function init(settings) {
    cancel();
    if (!settings.notificationEnabled) return;
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    scheduleDaily(settings.notificationHour || 20, settings.notificationMinute || 0);
  }

  return { requestPermission, init, cancel };
})();
